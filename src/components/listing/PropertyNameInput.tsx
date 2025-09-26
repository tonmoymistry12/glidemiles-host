import React from 'react';
import styles from './PropertyNameInput.module.scss';

interface PropertyNameInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const PropertyNameInput: React.FC<PropertyNameInputProps> = ({
  value,
  onChange,
  placeholder = "Property name",
  maxLength = 100
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={styles.input}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <div className={styles.characterCount}>
        {value.length}/{maxLength}
      </div>
    </div>
  );
};
