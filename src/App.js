import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Login from "./Login";
import Signup from "./SignUp";
import VerifyEmail from "./VerifyEmail";
import CompleteProfile from "./CompleteProfile";
import IdentityVerification from "./IdentityVerification";
import CreatePin from "./CreatePin";
import Dashboard from "./Dashboard";
import SendMoney from "./SendMoney";
import AddMoney from "./AddMoney";
import PayBills from "./PayBills";
import TransactionHistory from "./TransactionHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/identity-verification" element={<IdentityVerification />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/add-money" element={<AddMoney />} />
        <Route path="/pay-bills" element={<PayBills />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;