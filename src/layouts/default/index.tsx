import React from "react";
import { HeaderDefault } from "../../components/headers/headerDefault";
import { WarningScreen } from "../../components/warning-screen";

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <HeaderDefault />
      {children}
    </>
  );
};
