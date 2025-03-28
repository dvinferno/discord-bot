import React, { useEffect, useState } from "react";
import "../../styles/global.css";
import LoginButton from "./LoginButton";

const Login = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3002/auth/validate", {
          credentials: "include", // Ensure cookies are sent
        });

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.log("Failed to authenticate. Please log in.");
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:3002/logout"; // Redirect the user
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      id="login"
      className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black"
    >
      <div className="text-center p-10 bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to My Bot Dashboard!
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Log in to manage your bot and settings easily.
        </p>
        <div className="pb-8">
          {user ? (
            <div className="flex flex-col items-center">
              <LoginButton text="Go to Dashboard" redirectUri="/dashboard" />
              <button
                className="text-red-500 cursor-pointer hover:text-red-600 pt-2 underline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <LoginButton
              text="Login to Discord"
              redirectUri="http://localhost:3002/auth/discord"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
