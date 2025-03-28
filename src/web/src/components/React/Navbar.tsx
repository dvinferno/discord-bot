import React from "react";

function Navbar() {
  const handleLogout = () => {
    // Logic for logout can go here
    console.log("Logged out");
  };

  return (
    <nav className="flex justify-between items-center p-2 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <div className="text-white text-1xl font-bold">Dashboard</div>

      <div className=" items-center space-x-5">
        <button
          onClick={handleLogout}
          className="bg-red-800 hover:bg-red-900 text-white-800 font-semibold py-2 px-4 rounded shadow cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
