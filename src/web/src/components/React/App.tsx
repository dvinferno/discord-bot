import React from "react";
import { UserProvider } from "../../context/UserContext";
import Login from "../../components/React/Login";
import Navbar from "../../components/React/Navbar";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Navbar />
      <Login />
    </UserProvider>
  );
};

export default App;
