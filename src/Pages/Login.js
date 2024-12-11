import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    userType: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Login if admin
      if (
        credentials.username === "admin" &&
        credentials.password === "12345" &&
        credentials.userType === "ADMIN"
      ) {
        navigate("/admin");
      } else {
        // Login for customer and vendor
        const response = await axios.post(
          `http://localhost:8080/auth/login?userType=${credentials.userType}&username=${credentials.username}&password=${credentials.password}`
        );
        navigate(response.data);
      }
    } catch (error) {
      setErrorMessage("Wrong username or password");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const urlParamUserType =
      credentials.userType === "VENDOR"
        ? "vendors"
        : credentials.userType === "CUSTOMER"
        ? "customers"
        : "admin";

    const requestBody = credentials;
    try {
      const response = await axios.post(
        `http://localhost:8080/${urlParamUserType}/add`,
        requestBody
      );

      navigate("/" + credentials.userType + "?" + response.data.username);
    } catch (error) {
      setErrorMessage("Wrong username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-6">
          <button
            className={`flex-1 py-2 text-lg font-semibold transition-all border-b-2 ${
              activeTab === "login"
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-lg font-semibold transition-all border-b-2 ${
              activeTab === "signup"
                ? "border-blue-500 text-blue-500"
                : "border-gray-300 text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" && (
          // Handle login section
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="userType"
                className="block text-gray-700 font-medium mb-2"
              >
                User Type
              </label>
              <select
                name="userType"
                value={credentials.userType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="selectUser">Select user type</option>
                <option value="CUSTOMER">Customer</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Login
            </button>
          </form>
        )}

        {activeTab === "signup" && (
          // Handle sign up section
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="userType"
                className="block text-gray-700 font-medium mb-2"
              >
                User Type
              </label>
              <select
                value={credentials.userType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="selectUser">Select user type</option>
                <option value="CUSTOMER">Customer</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
