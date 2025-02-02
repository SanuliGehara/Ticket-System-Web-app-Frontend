import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.js";
import Admin from "./Pages/Admin.js";
import VendorPanel from "./Pages/Vendor.js";
import CustomerPage from "./Pages/Customer.js";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/vendor" element={<VendorPanel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
