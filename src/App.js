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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route
          path="/identity-verification"
          element={<IdentityVerification />}
        />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;