// src/context/AddressContext.js
import React, { createContext, useState } from "react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  return (
    <AddressContext.Provider
      value={{ address, setAddress, addressDetail, setAddressDetail }}
    >
      {children}
    </AddressContext.Provider>
  );
};
