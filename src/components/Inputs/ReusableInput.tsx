// components/Inputs/ReusableInput.tsx

import React from 'react';
import type { ReusableInputProps } from '../../types/types';

const ReusableInput: React.FC<ReusableInputProps> = ({
  type,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  options = [],
  required = false,
}) => {
  const showError = touched && error;

  // ✅ Simple inline autocomplete logic

  return (
    <div className={`form-group ${showError ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}{required && ' *'}</label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value as string}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={name === 'name' ? 'name' : 'off'}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          autoComplete={name === 'name' ? 'name' : 'off'}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={type === 'checkbox' ? undefined : (value as string)}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          checked={type === 'checkbox' ? (value as boolean) : undefined}
          required={required}
          autoComplete={name === 'name' ? 'name' : 'off'}
        />
      )}

      {showError && <div className="error">{error}</div>}
    </div>
  );
};

export default ReusableInput;