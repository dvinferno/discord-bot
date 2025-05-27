import "../../styles/global.css";
import LinkButton from "./LinkButton";
import { useUser } from "../../context/UserContext";

const Login = () => {
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      window.location.href = "http://localhost:3002/logout"; // Redirect the user
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div id="login" className="flex min-h-screen items-center justify-center">
      <div className="text-center max-w-lg w-full mb-50">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to "Unititled Bot" Dashboard
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Log in to manage bot and settings easily.
        </p>
        <div className="pb-8">
          {user ? (
            <div className="flex flex-col items-center">
              <LinkButton text="Go to Dashboard" redirectUri="/dashboard" />
              <button
                className="text-red-500 cursor-pointer hover:text-red-600 pt-2 underline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <LinkButton
              text="Login to with Discord"
              redirectUri="http://localhost:3002/auth/discord"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
