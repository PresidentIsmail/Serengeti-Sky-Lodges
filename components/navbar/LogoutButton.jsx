


import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const LogoutButton = ({handleLogout}) => {


  return (
    <Button
      onClick={handleLogout}
      className="bg-transparent hover:bg-transparent"
    >
      <IoLogOutOutline className="text-[28px]  text-black hover:text-black/70" />
    </Button>
  );
};

export default LogoutButton;
