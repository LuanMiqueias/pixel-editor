import React from "react";
import styles from "./styles.module.css";

interface IProps {
  text?: string;
  type: string;
  placeholder?: string;
  fieldName: string;
  invalid: boolean;
  error?: string;
  image?: string;
}
export const InputField: React.FC<IProps> = ({
  text,
  type,
  placeholder,
  fieldName,
  image,
  invalid,
  error,
  ...rest
}) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={fieldName} className={invalid && styles.invalid}>
        {text}
        <div className={styles.input_block}>
          {image && (
            <div className={styles.image}>
              <img src={image} alt={type} />
            </div>
          )}
          <input
            type={type}
            placeholder={placeholder}
            id={fieldName}
            {...rest}
          />
        </div>
      </label>
      {error && invalid && (
        <div className={`${styles.InputError} animation_show_left`}>
          {error}
        </div>
      )}
    </div>
  );
};
