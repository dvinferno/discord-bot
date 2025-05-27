import { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3002/auth/validate", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Authentication failed");

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to authenticate. Please log in.");
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use user context
export const useUser = () => useContext(UserContext);
