import React, { FormEvent, ReactNode } from 'react';

interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="ml-4">
      {children}
      <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
        >
          Submit
        </button>
    </form>
  );
};

export default Form;