import React from "react";
import { HeaderEditor } from "../../components/headers/headerEditor";
import { Toolbar } from "../../components/toolbar";
import styles from './styles.module.css';

export const EditorLayout: React.FC = ({ children }) => {
  return (
    <>
      <HeaderEditor />
      {children}
    </>
  );
};
