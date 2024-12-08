import React, { useState } from "react";

const CustomerPanel = () => {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const totalSeats = 10; // Adjust this number as needed

  const handleSeatClick = (seat) => {
    setSelectedTickets((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">
          Customer Panel
        </h2>
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seat) => (
            <button
              key={seat}
              className={`p-4 rounded-full border ${
                selectedTickets.includes(seat)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              } hover:bg-green-300`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Total Tickets Buy
          </label>
          <input
            type="text"
            readOnly
            value={selectedTickets.length}
            className="block w-16 p-2 border border-gray-300 rounded-md text-center bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerPanel;
