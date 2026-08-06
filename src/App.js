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
import TransactionDetails from "./TransactionDetails";
import Features from "./Features";
import Terms from "./Terms";
import Support from "./Support";
import Privacy from "./Privacy";
import ConfirmTransfer from "./ConfirmTransfer";
import EnterPin from "./EnterPin";
import TransferSuccess from "./TransferSuccess";
import AddMoneyPin from "./AddMoneyPin";
import AddMoneySuccess from "./AddMoneySuccess";
import PayBillsPin from "./PayBillsPin";
import PayBillSuccess from "./PayBillSuccess";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ChangePin from "./ChangePin";
import Settings from "./Settings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/signup"
          element={<Signup />}
        />


        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />


        <Route
          path="/complete-profile"
          element={<CompleteProfile />}
        />


        <Route
          path="/identity-verification"
          element={<IdentityVerification />}
        />


        <Route
          path="/create-pin"
          element={<CreatePin />}
        />



        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/send-money"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />



        <Route
          path="/add-money"
          element={
            <ProtectedRoute>
              <AddMoney />
            </ProtectedRoute>
          }
        />



        <Route
          path="/pay-bills"
          element={
            <ProtectedRoute>
              <PayBills />
            </ProtectedRoute>
          }
        />



        <Route
          path="/transaction-history"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />



        <Route
          path="/transaction-details"
          element={
            <ProtectedRoute>
              <TransactionDetails />
            </ProtectedRoute>
          }
        />



        <Route
          path="/confirm-transfer"
          element={
            <ProtectedRoute>
              <ConfirmTransfer />
            </ProtectedRoute>
          }
        />



        <Route
          path="/enter-pin"
          element={
            <ProtectedRoute>
              <EnterPin />
            </ProtectedRoute>
          }
        />



        <Route
          path="/transfer-success"
          element={
            <ProtectedRoute>
              <TransferSuccess />
            </ProtectedRoute>
          }
        />



        <Route
          path="/add-money-pin"
          element={
            <ProtectedRoute>
              <AddMoneyPin />
            </ProtectedRoute>
          }
        />



        <Route
          path="/add-money-success"
          element={
            <ProtectedRoute>
              <AddMoneySuccess />
            </ProtectedRoute>
          }
        />



        <Route
          path="/pay-bills-pin"
          element={
            <ProtectedRoute>
              <PayBillsPin />
            </ProtectedRoute>
          }
        />



        <Route
          path="/pay-bill-success"
          element={
            <ProtectedRoute>
              <PayBillSuccess />
            </ProtectedRoute>
          }
        />



        <Route
          path="/features"
          element={<Features />}
        />


        <Route
          path="/terms"
          element={<Terms />}
        />


        <Route
          path="/support"
          element={<Support />}
        />


        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />


        <Route
          path="/change-pin"
          element={
            <ProtectedRoute>
              <ChangePin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;