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

        const configData = response.data;

        setConfig(configData);

        // Calculate layout dimensions
        if (maxTicketCapacity && seatsPerRaw) {
          const rowsCount = Math.ceil(maxTicketCapacity / seatsPerRaw);
          const layout = [];
          let seatCounter = 1; //totalTicketBooked;

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

          setRows(layout);
        }
      } catch (error) {
        console.error("Error fetching configuration:", error);
        alert("Error fetching configuration:", error);
      }
    };

    fetchConfig();
  }, []);

  // Handle ticket purchase
  const handlePurchase = async () => {
    const totalPrice = ticketsToBuy * config.priceOfATicket;

    // update total tickets booked to update the layout
    const newtotBokedTickets = totalTicketBooked + ticketsToBuy;
    setTotalTicketBooked(newtotBokedTickets);

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
        `http://localhost:8080/transactions/add?type=PURCHASE&ticketId=${dbTicketId}&customerId=gehara@gmail.com`
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
                const isReleased = seat <= config.totalTickets;
                const isBooked = seat <= totalTicketBooked;
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
