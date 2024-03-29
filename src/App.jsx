import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/userAuthContext";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Splash from "./Pages/Splash/Splash";
import Signup from "./Pages/Signup/Signup";
import ButtonAppBar from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import Formulario from "./Pages/Formulario/Formulario";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <ButtonAppBar>
          <Routes>
            <Route path="/" element={<Splash />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
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
              path="/formulario"
              element={
                <ProtectedRoute>
                  <Formulario />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ButtonAppBar>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
