import React, { useState, useEffect } from "react";
import axios from "axios";

const ConfigurationPage = () => {
  const [configuration, setConfiguration] = useState({
    maxTicketCapacity: 60,
    totalTickets: 20,
    ticketReleaseRate: 2000,
    customerRetrievalRate: 2000,
    seatsPerRaw: 10,
    totalTicketsPerVendor: 5,
  });

  const [isInitialized, setIsInitialized] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch configuration from backend - database for the first time
  useEffect(() => {
    axios
      .get("http://localhost:8080/configuration")
      .then((response) => {
        console.log(response.data);
        setConfiguration(response.data);
        setIsInitialized(false);
      })
      .catch((error) => {
        setMessage("Error fetching configuration: " + error.message);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfiguration((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  // Save new configuration to backend
  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/configuration/initialize", configuration)
      .then((response) => {
        setConfiguration(response.data);
        setIsInitialized(true);
        setMessage("Configuration saved successfully!");
      })
      .catch((error) => {
        setMessage("Error saving configuration: " + error.message);
      });
  };

  // Start the application
  const handleStart = () => {
    axios
      .put("http://localhost:8080/configuration/start")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        setMessage("Error starting application: " + error.message);
      });
  };

  // Stop the application
  const handleStop = () => {
    axios
      .put("http://localhost:8080/configuration/stop")
      .then((response) => {
        setMessage(response.data);
        setIsInitialized(false); //set config is inizilaised to false - button set Config will be visible
      })
      .catch((error) => {
        setMessage("Error stopping application: " + error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Configuration
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="maxTicketCapacity"
              className="block text-gray-700 font-medium"
            >
              Max Ticket Capacity:
            </label>
            <input
              type="number"
              id="maxTicketCapacity"
              name="maxTicketCapacity"
              value={configuration.maxTicketCapacity}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="totalTickets"
              className="block text-gray-700 font-medium"
            >
              Total Tickets:
            </label>
            <input
              type="number"
              id="totalTickets"
              name="totalTickets"
              value={configuration.totalTickets}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="totalTicketsPerVendor"
              className="block text-gray-700 font-medium"
            >
              Total Tickets Per Vendor:
            </label>
            <input
              type="number"
              id="totalTicketsPerVendor"
              name="totalTicketsPerVendor"
              value={configuration.totalTicketsPerVendor}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="ticketReleaseRate"
              className="block text-gray-700 font-medium"
            >
              Ticket Release Rate (ms):
            </label>
            <input
              type="number"
              id="ticketReleaseRate"
              name="ticketReleaseRate"
              value={configuration.ticketReleaseRate}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="customerRetrievalRate"
              className="block text-gray-700 font-medium"
            >
              Customer Retrieval Rate (ms):
            </label>
            <input
              type="number"
              id="customerRetrievalRate"
              name="customerRetrievalRate"
              value={configuration.customerRetrievalRate}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="seatsPerRaw"
              className="block text-gray-700 font-medium"
            >
              Seats Per Row:
            </label>
            <input
              type="number"
              id="seatsPerRaw"
              name="seatsPerRaw"
              value={configuration.seatsPerRaw}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isInitialized}
            className={`w-full px-4 py-2 text-white rounded-md shadow-md ${
              isInitialized
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isInitialized ? "Configuration Set" : "Set Configuration"}
          </button>
        </form>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleStart}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Start
          </button>
          <button
            type="button"
            onClick={handleStop}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Stop
          </button>
        </div>

        {message && (
          <div className="mt-4 p-4 text-center text-sm text-gray-900 bg-slate-300 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPage;
