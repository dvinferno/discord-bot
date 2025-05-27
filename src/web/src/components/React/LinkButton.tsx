import "../../styles/global.css";

type props = {
  text: string;
  redirectUri: string;
  className?: string;
};

function LinkButton({ text, redirectUri, className = "" }: props) {
  const handleLogin = () => {
    window.location.href = redirectUri;
  };

  return (
    <button
      className={`btn rounded-md bg-indigo-600 hover:bg-indigo-700/80 transition ${className}`}
      onClick={handleLogin}
    >
      {text}
    </button>
  );
}

export default LinkButton;
