import type React from "react";
import "../../styles/global.css";

type props = {
  text: string;
  redirectUri: string;
};

const LinkButton: React.FC<props> = ({ text, redirectUri }) => {
  const handleLogin = () => {
    window.location.href = redirectUri;
  };

  return (
    <button
      className="btn rounded-md bg-indigo-600 hover:bg-indigo-700"
      onClick={handleLogin}
    >
      {text}
    </button>
  );
};

export default LinkButton;
