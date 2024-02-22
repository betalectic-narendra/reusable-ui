import React, { ChangeEvent } from 'react';

interface LabeledInputProps {
  label: string;
  type:string;
  value?: string;
  name?:string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, type, value, name, handleChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="content" className="block mb-1">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default LabeledInput;
