import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfettiButton } from "@/components/ui/confetti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "@/config/axiosInstance";
import { useAuth } from "@/config/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/login", {
        username: auth.username[0],
        password: auth.password[0],
      });

      if (response.data.status === true) {
        setToken(response.data.token);
        localStorage.setItem("baseUrl", "http://localhost:8000/");
        localStorage.setItem("id", response.data.user.usr_id);
        navigate("/", { replace: true });
      } else {
        setErr(true);
        setMsg(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      {err ? (
        <Alert className="text-red-700 bg-red-100">
          <AlertTitle>Error Alert</AlertTitle>
          <AlertDescription>{msg}</AlertDescription>
        </Alert>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => {
              handleChange(e);
              setErr(false);
            }}
            type="text"
            name="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => handleChange(e)}
            type={show ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox id="terms" onCheckedChange={handleShowPassword} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {show ? "Hide" : "Show"} Password
          </label>
        </div>

        <ConfettiButton type="submit" className="w-full">
          Sign In
        </ConfettiButton>
      </form>
    </React.Fragment>
  );
};

export default Signin;
