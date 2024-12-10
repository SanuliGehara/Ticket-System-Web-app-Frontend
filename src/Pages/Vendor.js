import React, { useState, useEffect } from "react";
import axios from "axios";

const VendorPage = () => {
  const [vendorData, setVendorData] = useState({
    maxCapacity: 0,
    totalTickets: 0,
    ticketReleaseRate: 0,
    remainingTickets: 0,
    ticketsPerRelease: 0,
  });
  const [message, setMessage] = useState("");
  const [conDBtotTicket_P_Vendor, setConDBtotTicket_P_Vendor] = useState(5);

  // Fetch ticket pool information from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/configuration") // Adjust endpoint based on backend
      .then((response) => {
        const config = response.data;

        setVendorData({
          maxCapacity: config.maxTicketCapacity,
          totalTickets: config.totalTickets,
          ticketReleaseRate: config.ticketReleaseRate,
          remainingTickets: config.maxTicketCapacity - config.totalTickets,
          ticketsPerRelease: config.totalTicketsPerVendor,
        });

        //setConDBtotTicket_P_Vendor(config.ticketsPerRelease);
      })
      .catch((error) => {
        setMessage("Error fetching vendor data: " + error.message);
      });
  }, []);

  // Handle ticket release
  const handleReleaseTickets = () => {
    const { ticketsPerRelease } = vendorData;
    const ConDBtotTicket_P_Vendor = 5;
    //Check if the total tickets per release exceeds defined value in configuration
    // if (vendorData.ticketsPerRelease > conDBtotTicket_P_Vendor) {
    if (vendorData.ticketsPerRelease > ConDBtotTicket_P_Vendor) {
      console.log("Number larger than " + conDBtotTicket_P_Vendor);
      alert(
        `${vendorData.ticketsPerRelease} larger than ${conDBtotTicket_P_Vendor}`
      );
    } else {
      console.log("total tick per release " + conDBtotTicket_P_Vendor);
      axios
        .post("http://localhost:8080/tickets/add", { count: ticketsPerRelease }) // Adjust endpoint
        .then((response) => {
          setMessage("Tickets released successfully!");
          // Update the remainingTickets and totalTickets
          setVendorData((prevState) => ({
            ...prevState,
            totalTickets: prevState.totalTickets + ticketsPerRelease,
            remainingTickets:
              prevState.maxCapacity -
              (prevState.totalTickets + ticketsPerRelease),
          }));
          // to be update the config table, totalTickets = totalTickets + ticketsPerRelease
          //to be update vendor table, for the peticlur vendor , totNumOfTicketReleased = totNumOfTicketReleased + ticketsPerRelease
          // to be update vendor table, for the peticlur vendor , lastReleasedTime = currentTime as a String
          // to be add new record, to transaction table, log vendor booking information
        })
        .catch((error) => {
          setMessage("Error releasing tickets: " + error.message);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Vendor Dashboard
        </h2>
        {/* Screen and Seats Layout */}
        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <h3 className="text-center text-lg font-semibold mb-4">Screen</h3>
          <div className="grid grid-cols-10 gap-2">
            {[...Array(vendorData.maxCapacity)].map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-md ${
                  index < vendorData.totalTickets
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Ticket Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Max Capacity:
            </label>
            <input
              type="number"
              value={vendorData.maxCapacity}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Total Tickets:
            </label>
            <input
              type="number"
              value={vendorData.totalTickets}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Remaining Tickets:
            </label>
            <input
              type="number"
              value={vendorData.remainingTickets}
              readOnly
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Number of tickets to be released:
            </label>
            <input
              type="number"
              value={vendorData.ticketsPerRelease}
              onChange={(e) =>
                setVendorData({
                  ...vendorData,
                  ticketsPerRelease: parseInt(e.target.value, 10),
                })
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Release Tickets Button */}
        <button
          onClick={handleReleaseTickets}
          className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Release Tickets
        </button>

        {/* Message Display */}
        {message && (
          <div className="mt-4 p-4 text-center text-sm text-gray-900 bg-slate-300 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
