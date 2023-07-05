import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const alert = useProvideAlert();

  return (
    <AlertContext.Provider value={alert}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};

function useProvideAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const showAlertMessage = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const hideAlertMessage = () => {
    setShowAlert(false);
  };

  return {
    showAlertMessage,
    hideAlertMessage,
    alertMessage,
    showAlert,
    alertType,
  };
}
