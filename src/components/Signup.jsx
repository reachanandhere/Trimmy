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
import { signup } from "@/db/apiauth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profile_pic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longURL = searchParams.get("createNew");

  const {
    data,
    error,
    loading,
    fn: fnSignup,
  } = useFetch(signup, { email: formData.email, password: formData.password, name: formData.name, profile_pic: formData.profile_pic });

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error == null && data) {
      navigate(`/dashboard?${longURL ? `createNew=${longURL}` : ""}`);
      fetchUser();
    }
  }, [data, error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is required"),
        name: yup
          .string()
          .required("Name is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: yup.mixed().required("Profile Picture is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
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
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create a new account if you haven't already
        </CardDescription>
        <Error message={error?.message} />
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
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

        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profic_pic && <Error message={errors.profic_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {" "}
          {loading ? <BeatLoader size={10} color="green" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
