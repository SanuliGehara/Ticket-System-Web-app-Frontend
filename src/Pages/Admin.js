import React from "react";

const AdminPanel = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-96 p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Config Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Max Capacity
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={10}
              placeholder="Enter max capacity"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total Tickets
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter total tickets"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total Vendors
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter total vendors"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Total Customers
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter total customers"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Release Rate
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter release rate"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Retrieval Ratio
            </label>
            <input
              type="number"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter retrieval ratio"
            />
          </div>
        </form>
        <div className="flex justify-between mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
            Start
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600">
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
