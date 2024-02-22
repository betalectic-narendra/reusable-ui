import React, { useState } from "react";
import { registerUser } from "../helpers/apis";
import LabeledInput from "@repo/ui/labeledInput";
import Form from "@repo/ui/form";
interface Props {
  setRegisterUser: React.Dispatch<React.SetStateAction<boolean>>;
}
interface RegisterData {}

const Register: React.FC<Props> = ({ setRegisterUser }) => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser("/register", registerData);
      setRegisterUser(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };
  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl">Register</h2>
      <Form onSubmit={handleSubmit}>
        <LabeledInput
          label={"Email"}
          type={"text"}
          value={registerData?.email}
          name={"email"}
          handleChange={handleChange}
        />
        <LabeledInput
          label={"Password"}
          type={"text"}
          value={registerData?.password}
          name={"password"}
          handleChange={handleChange}
        />
      </Form>
      <button
        className="mt-4 text-blue-500 px-6 py-3 bg-white rounded-lg focus:outline-none"
        onClick={() => setRegisterUser(false)}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Register;
