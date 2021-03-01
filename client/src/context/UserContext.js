import React, { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('x-auth-token') ? true : false);

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
