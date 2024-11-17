import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfettiButton } from "@/components/ui/confetti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "@/providers/auth-axios";
import { useAuth } from "@/providers/auth-provider";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
    setErr(false);

    if (auth.email.includes("@") && auth.email != "" && auth.password != "")
      setIsComplete(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", auth);

      if (response.data.token) {
        setToken(response.data.token);
        navigate("/", { replace: true });
      } else {
        setErr(true);
        setMsg(response?.data?.error);
      }
    } catch (e) {
      setErr(e.response?.data?.error || "Something went wrong.");
      console.log(e);
    }
  };

  const handleShowPassword = () => {
    setShow(!show);
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
          <Label htmlFor="username">Email Address*</Label>
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="someone@example.com"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
          <Label htmlFor="password">Password*</Label>
          <Input
            onChange={handleChange}
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

        <ConfettiButton
          disabled={isComplete ? false : true}
          type="submit"
          className="w-full"
        >
          Sign In
        </ConfettiButton>
      </form>
    </React.Fragment>
  );
};

export default Signin;
