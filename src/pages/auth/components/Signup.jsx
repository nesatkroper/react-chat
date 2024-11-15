import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfettiButton } from "@/components/ui/confetti";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axiosInstance from "@/config/axiosInstance";
import { useAuth } from "@/config/AuthProvider";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [c_password, setCPassword] = useState("");
  const [auth, setAuth] = useState({
    name: "",
    gender: "male",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.password != c_password) {
      setErr(true);
      setMsg("Password is incorrect");
    } else {
      try {
        const response = await axiosInstance.post("/register", {
          name: auth.name[0],
          gender: auth.gender[0],
          username: auth.username[0],
          email: auth.email[0],
          password: auth.password[0],
        });

        if (response.data.status) {
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
          <Label htmlFor="name">Name*</Label>
          <Input
            onChange={(e) => {
              handleChange(e);
              setErr(false);
            }}
            type="text"
            name="name"
            placeholder="Jonh Cena"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label htmlFor="gender">Gender*</Label>
          <RadioGroup
            onValueChange={(value) =>
              handleChange({ target: { name: "gender", value } })
            }
            name="gender"
            defaultValue="other"
            className="flex flex-row"
            required
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label htmlFor="username">Username*</Label>
          <Input
            onChange={(e) => {
              handleChange(e);
              setErr(false);
            }}
            type="text"
            name="username"
            placeholder="@jonhcena"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label htmlFor="email">Email*</Label>
          <Input
            onChange={(e) => {
              handleChange(e);
              setErr(false);
            }}
            type="email"
            name="email"
            placeholder="jonhcena@example.com"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
          <Label htmlFor="password">Password*</Label>
          <Input
            onChange={(e) => {
              handleChange(e);
              setErr(false);
            }}
            type={show ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
          <Label htmlFor="password">Confirm Password*</Label>
          <Input
            onChange={(e) => {
              setCPassword(e.target.value);
              setErr(false);
            }}
            type={show ? "text" : "password"}
            name="c_password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox onCheckedChange={handleShowPassword} id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {show ? "Hide" : "Show"} Password
          </label>
        </div>

        <ConfettiButton type="submit" className="w-full">
          Sign Up
        </ConfettiButton>
      </form>
    </React.Fragment>
  );
};

export default Signup;
