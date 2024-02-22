import React, { useContext, useState } from "react";
import Register from "../components/Register";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { loginUser } from "../helpers/apis";
import LabeledInput from "@repo/ui/labeledInput";
import Form from "@repo/ui/form";

interface LoginData {}
const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [registerUser, setRegisterUser] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser("/login", loginData);
      login(response);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return registerUser ? (
    <Register setRegisterUser={setRegisterUser} />
  ) : (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl mb-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        <LabeledInput
          label={"Email"}
          type={"text"}
          value={loginData?.email}
          name={"email"}
          handleChange={handleChange}
        />
        <LabeledInput
          label={"Password"}
          type={"password"}
          value={loginData?.password}
          name={"password"}
          handleChange={handleChange}
        />
      </Form>
      <button
        className="mt-4 text-blue-500 px-6 py-3 bg-white rounded-lg focus:outline-none"
        onClick={() => setRegisterUser(true)}
      >
        Go to Register
      </button>
    </div>
  );
};

export default Login;
