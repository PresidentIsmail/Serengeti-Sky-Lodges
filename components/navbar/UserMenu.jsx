"use client";

// third-party
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import { useAtom } from "jotai";
import { userFullNameAtom } from "@/atoms";

// api
import { logoutUser } from "@/supabase/authApi";
import { getUserSession } from "@/supabase/userApi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useEffect } from "react";

const defaultImg = "img/profile/default-avatar.jpg";

const UserMenu = () => {
  // get user data from session to use personolize avatar
  const { data: userData, error, mutate } = useSWR("/", getUserSession);
  const router = useRouter();
  const [user, setUser] = useAtom(userFullNameAtom);

  // set full_name to userAtom
  useEffect(() => {
    if (userData) {
      setUser(userData.full_name);
    }
  }, [userData, setUser]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // wait to get userData
  if (!userData) {
    return <p className="text-sm text-gray-500">loading user...</p>;
  }

  // if there is an error getting userData
  if (error) {
    toast.error(error);
    return <p className="text-sm text-red-500">error fetching user.</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10 border-[2px] border-violet-500 p-[1px]">
            <AvatarImage
              src={userData.avatar || defaultImg}
              alt="profile image"
              className="rounded-full"
            />
            <AvatarFallback>
              {userData.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 py-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="font-semibold leading-none">{userData.full_name}</p>
            <p className="text-xs leading-none text-gray-600">
              {userData.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
