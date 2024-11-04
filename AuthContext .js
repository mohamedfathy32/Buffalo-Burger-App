import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState(null); // To track the logged-in user

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user to the currently logged in user
    });
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);


  const logout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser(null); // Reset user state
      console.log('asd');
      
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
