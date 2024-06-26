"use client";

import React, { createContext, useContext, useState } from "react";

type LogoutModalContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type LogoutModalProviderProps = {
  children: React.ReactNode;
};

const logoutModalContext = createContext<LogoutModalContextType | undefined>(
  undefined
);

const LogoutModalProvider: React.FC<LogoutModalProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const contextValue: LogoutModalContextType = {
    isOpen,
    setIsOpen,
  };

  return (
    <logoutModalContext.Provider value={contextValue}>
      {children}
    </logoutModalContext.Provider>
  );
};

const useLogoutContext = () => {
  const context = useContext(logoutModalContext);
  if (!context) {
    throw new Error(
      "useLogoutContext must be used within a LogoutModalProvider"
    );
  }
  return context;
};

export { LogoutModalProvider, useLogoutContext };
