import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerPage = () => {
  const [config, setConfig] = useState({});
  const [rows, setRows] = useState([]);
  const [ticketsToBuy, setTicketsToBuy] = useState(1);

  const [maxTicketCapacity, setMaxTicketCapacity] = useState(null);
  const [seatsPerRaw, setSeatsPerRaw] = useState(null);
  const [totalTicketBooked, setTotalTicketBooked] = useState(null);

  // Fetch configuration on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get("http://localhost:8080/configuration");

        // Destructure the necessary fields from the response
        const { maxTicketCapacity, seatsPerRaw, totalTicketBooked } =
          response.data;

        // Assign values to state
        setMaxTicketCapacity(maxTicketCapacity);
        setSeatsPerRaw(seatsPerRaw);
        setTotalTicketBooked(totalTicketBooked);

        console.log("Max Ticket Capacity:", maxTicketCapacity);
        console.log("Seats Per Row:", seatsPerRaw);
        console.log("totalTicketBooked:", totalTicketBooked);

        console.log("API Response:", response.data);
        const configData = response.data;
        console.log("ConfigData ", configData);

        setConfig(configData);
        console.log("Global ", config);

        /*
        // Validate and calculate layout dimensions
        setCustomerData({
          maxTicketCapacity: configData.maxTicketCapacity,
          seatPerRaw: configData.seatPerRaw,
          totalTicketBooked: configData.totalTicketBooked,
        });
        */

        // const maxTicketCapacity = configData.maxTicketCapacity || 48;
        // const seatPerRaw = configData.seatPerRaw || 5;
        // let noOfSeatBooked = configData.totalTicketBooked || 2;

        // Calculate layout dimensions
        if (maxTicketCapacity && seatsPerRaw) {
          const rowsCount = Math.ceil(maxTicketCapacity / seatsPerRaw);
          const layout = [];
          let seatCounter = totalTicketBooked; //1;

          for (let i = 0; i < rowsCount; i++) {
            const row = [];
            for (
              let j = 0;
              j < seatsPerRaw && seatCounter <= maxTicketCapacity;
              j++
            ) {
              row.push(seatCounter);
              seatCounter++;
            }
            layout.push(row);
          }
          /*
        if (customerData.maxTicketCapacity && customerData.seatPerRaw) {
          const rowsCount = Math.ceil(
            customerData.maxTicketCapacity / customerData.seatPerRaw
          );
          const layout = [];
          let seatCounter = customerData.noOfSeatBooked; //1;

          for (let i = 0; i < rowsCount; i++) {
            const row = [];
            for (
              let j = 0;
              j < customerData.seatPerRaw &&
              seatCounter <= customerData.maxTicketCapacity;
              j++
            ) {
              row.push(seatCounter);
              seatCounter++;
            }
            layout.push(row);
          }
          */

          console.log("Generated Rows:", layout);
          setRows(layout);
        }
      } catch (error) {
        console.error("Error fetching configuration:", error);
      }
    };

    fetchConfig();
  }, []);

  // Handle ticket purchase
  const handlePurchase = async () => {
    const totalPrice = ticketsToBuy * config.priceOfATicket;

    // 1) Instert a record to transaction table in db
    let dbTicketId = ticketsToBuy + "-<";
    let seperator, closeBracket;
    if (ticketsToBuy === 1) {
      seperator = "";
      closeBracket = ">";
    } else {
      seperator = "_";
      closeBracket = ">";
    }

    // Create ticket ID's to enter to db
    for (let i = 1; i <= ticketsToBuy; i++) {
      if (i === ticketsToBuy) {
        seperator = "";
      }
      dbTicketId = dbTicketId + i + seperator;
    }
    dbTicketId = dbTicketId + closeBracket;
    alert("db ticket id: " + dbTicketId);
    try {
      await axios.post(
        `http://localhost:8080/transactions/add?type=PURCHASE&ticketId=${dbTicketId}&customerId=wasa@gmail.com`
      );
      alert(`Successfully bought ${ticketsToBuy} tickets for RS ${totalPrice}`); // transaction record saved
    } catch (error) {
      alert(
        "Ticket purchase did not insert to the Transaction table: " + error
      );
    }

    // 2) Update records of the ticket table in db (isAvailable = false)
    try {
      await axios
        .post(
          `http://localhost:8080/tickets/buy?numberOfTickets=${ticketsToBuy}`
        )
        .then((response) => {
          const res = response.data;
          //console.log(res);
          // show the response/res (sucess, not) in UI
        });
      alert(`Updated isAvaialble in ticket table for ${ticketsToBuy} tickets`);
    } catch (error) {
      alert("Did not update the records in Ticket table: " + error);
    }

    // 3) Update record of the configuration table in db (totalTicketBooked)
    try {
      await axios.post(
        `http://localhost:8080/configuration/update?numberOfTickets=${ticketsToBuy}`
      );
      alert("Configuration updated successfully!");
    } catch (error) {
      alert("Did not update the configuration table: " + error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Page</h1>

      {/* Ticket Pool Layout */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">Screen</h2>
        <div className="border-t border-gray-400 w-full mb-4"></div>
        <div className="space-y-2">
          {/* Render each row */}
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-start">
              {row.map((seat) => {
                const isReleased = seat <= config.totalTickets + 1;
                const isBooked = seat <= totalTicketBooked; //config.totalTicketBooked + 1;
                return (
                  <div
                    key={seat}
                    className={`w-8 h-8 rounded-full border ${
                      isBooked
                        ? "bg-red-500"
                        : isReleased
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Form */}
      <div className="mb-6">
        <label htmlFor="ticketsToBuy" className="block mb-2">
          No. of Tickets to Buy:
        </label>
        <input
          id="ticketsToBuy"
          type="number"
          value={ticketsToBuy}
          min={1}
          max={config.maxTicketCapacity - config.totalTicketBooked}
          onChange={(e) => setTicketsToBuy(Number(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="mb-6">
        <p>
          Total Price (RS):{" "}
          <span className="font-bold">
            {ticketsToBuy * config.priceOfATicket}
          </span>
        </p>
      </div>

      <button
        onClick={handlePurchase}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Buy Tickets
      </button>
    </div>
  );
};

export default CustomerPage;
