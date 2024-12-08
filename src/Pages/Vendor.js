import React, { useState } from "react";

const VendorPanel = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [remainingSize, setRemainingSize] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(50); // Example max capacity
  const [releaseTickets, setReleaseTickets] = useState(0);

  const handleTicketRelease = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setReleaseTickets(value);
    setRemainingSize(maxCapacity - value);
    setTotalTickets(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">Vendor Panel</h2>
        {/* Screen Area */}
        <div className="text-center bg-gray-200 py-2 rounded-md mb-4 font-medium">
          Screen
        </div>
        {/* Seats */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {Array.from({ length: maxCapacity }, (_, i) => (
            <div
              key={i}
              className={`p-4 rounded-full border bg-gray-200 text-center`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        {/* Ticket Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Total Tickets
            </label>
            <input
              type="text"
              readOnly
              value={totalTickets}
              className="block w-24 p-2 border border-gray-300 rounded-md text-center bg-gray-50"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Remaining Size
            </label>
            <input
              type="text"
              readOnly
              value={remainingSize}
              className="block w-24 p-2 border border-gray-300 rounded-md text-center bg-gray-50"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Max Capacity
            </label>
            <input
              type="text"
              readOnly
              value={maxCapacity}
              className="block w-24 p-2 border border-gray-300 rounded-md text-center bg-gray-50"
            />
          </div>
        </div>
        {/* Input Field */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Ticket to Release
          </label>
          <input
            type="number"
            value={releaseTickets}
            onChange={handleTicketRelease}
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default VendorPanel;
