import Login from "@/components/Login";
import SignUp from "@/components/Signup";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UrlState } from "@/context";

import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
    const longURL = searchParams.get("createNew")
    const navigate = useNavigate()


    const { isAuthenticated, loading } = UrlState()

    useEffect(()=>{
        if(isAuthenticated && !loading){
            navigate(`/dashboard?${longURL ? `createNew=${longURL}` : ""}`);
        }
    }, [isAuthenticated, loading])

  return (
    <div className="mt-30 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {searchParams.get("createNew")
          ? "Hold up! Let's login first.."
          : "Login / Sign Up"}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">  <Login /> </TabsContent>
        <TabsContent value="signup"> <SignUp /> </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
