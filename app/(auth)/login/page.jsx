import Image from "next/image";

import logo from "@/public/img/logo-light.png";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
    
        <Image src={logo} height={125} width={"auto"} alt="logo" />
   

      <LoginForm />
    </div>
  );
};

export default Login;
