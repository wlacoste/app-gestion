import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/userAuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
