import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfettiButton } from "@/components/ui/confetti";
import axios from "@/providers/auth-axios";
import { useAuth } from "@/providers/auth-provider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, UserSquare } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Signup = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [wait, setWait] = useState(false);
  const [otp, setOtp] = useState("");
  const [c_password, setCPassword] = useState("");
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    name: "",
    role: "User",
  });

  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
    setErr(false);

    // ! check is email input currently
    if (!isVerify && auth.name != "")
      auth.email.includes("@") ? setIsEmail(true) : setIsEmail(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.password != c_password) {
      setErr(true);
      setMsg("Password is incorrect");
    } else {
      try {
        const response = await axios.post("/register", auth);

        if (response.data.token) {
          setToken(response.data.token);
          navigate("/", { replace: true });
        } else {
          setErr(true);
          setMsg(response.data.message);
        }
      } catch (e) {
        setErr(e.response?.data?.error || "Something went wrong.");
        console.log(e);
      }
    }
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleVerifyEmail = async () => {
    try {
      setIsEmail(false);
      setWait(true);
      const res = await axios.post("/gmail/send", { email: auth.email });
      if (res.status == 200) {
        setWait(false);
        setIsSendOtp(true);
      } else {
        setMsg(res.data);
        setErr(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleVerifyEmailConfirm = async () => {
    try {
      const res = await axios.post("/gmail/verify", {
        email: auth.email,
        otp: otp,
      });

      console.log(res);
      if (res.status == 200) {
        setIsSendOtp(false);
        setIsVerify(true);
        setIsFinish(true);
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
          <Label htmlFor="name">Name*</Label>
          <Input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Jonh Cena"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
          <Label htmlFor="email">Email*</Label>
          <Input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="jonhcena@example.com"
            required
            disabled={isSendOtp || isVerify ? true : false}
          />
          {isEmail ? (
            <Button type="button" onClick={handleVerifyEmail} variant="outline">
              Verify Email
            </Button>
          ) : (
            ""
          )}

          {wait ? (
            <Button disabled variant="outline">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            ""
          )}

          {isSendOtp ? (
            <div className="flex gap-2">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                onClick={handleVerifyEmailConfirm}
                variant="outline"
                type="button"
              >
                Verify
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
        {isVerify ? (
          <div>
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
          </div>
        ) : (
          ""
        )}

        <ConfettiButton
          disabled={!isFinish ? true : false}
          type="submit"
          className="w-full"
        >
          Sign Up
        </ConfettiButton>
      </form>
    </React.Fragment>
  );
};

export default Signup;
