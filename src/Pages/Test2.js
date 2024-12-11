import React, { useEffect, useState } from "react";
import axios from "axios";

const Test2 = () => {
  const [maxTicketCapacity, setMaxTicketCapacity] = useState(null);
  const [seatsPerRaw, setSeatsPerRaw] = useState(null);
  const [totalTicketBooked, setTotalTicketBooked] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Max Ticket Capacity: {maxTicketCapacity}</p>
      <p>Seats Per Row {seatsPerRaw}</p>
      <p>totalTicketBooked: {totalTicketBooked}</p>
    </div>
  );
};

export default Test2;
