import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.js";
import Home from "./Pages/Home.js";
import Admin from "./Pages/Admin.js";
import CustomerPanel from "./Pages/Customer.js";
import VendorPanel from "./Pages/Vendor.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<CustomerPanel />} />
        <Route path="/vendor" element={<VendorPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
