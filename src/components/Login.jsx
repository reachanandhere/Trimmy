import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as yup from "yup";
import useFetch from "@/hooks/useFetch";
import { login } from "@/db/apiauth";
import { useNavigate, useSearchParams } from "react-router-dom";
const Login = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longURL = searchParams.get("createNew");

  const {
    data,
    error,
    loading,
    fn: fnLogin,
  } = useFetch(login, { email: formData.email, password: formData.password });

  useEffect(() => {
    if (error == null && data) {
      navigate(`/auth?createNew=${longURL ? `createNew=${longURL}` : ""}`);
    }
  }, [data, error, loading]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnLogin();
      //api call
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you have one</CardDescription>
        <Error message={error?.message} />
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>

        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin}>
          {" "}
          {loading ? <BeatLoader size={10} color="green" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
