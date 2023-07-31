import Image from "next/image";

import logo from "@/public/img/logo-light.png";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center">
      <Image src={logo} alt="logo" />

      <LoginForm />
    </div>
  );
};

export default Login;
