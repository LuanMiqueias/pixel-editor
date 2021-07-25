import React from "react";
import styles from "./styles.module.css";

interface IProps {
  text?: string;
  type: string;
  placeholder?: string;
  fieldName: string;
}
export const InputField: React.FC<IProps> = ({
  text,
  type,
  placeholder,
  fieldName,
}) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={fieldName}>
        {text}
        <input type={type} placeholder={placeholder} id={fieldName} />
      </label>
    </div>
  );
};
