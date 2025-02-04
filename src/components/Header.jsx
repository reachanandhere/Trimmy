import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiauth";

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);
 
  return (
    <nav className="py-4 flex justify-between items-center">
      <Link to="/">
        <img src="logo.png" className="h-24" alt="logo" />
      </Link>
      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user_metadata.profile_pic} />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={'/dashboard'} className="flex">
                  <LinkIcon className="mr-2 h-4 w-4" /> <span>My Links</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                <LogOut className="mr-2 h-4 w-4" />{" "}
                <span
                  onClick={() => {
                    fnLogout().then(() => {
                      fetchUser();
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
