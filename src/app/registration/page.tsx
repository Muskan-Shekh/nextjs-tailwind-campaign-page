"use client";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { useState, useRef, useEffect, FormEvent } from "react";
import config from "../config";

const generateCaptchaText = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

export default function RegistrationForm() {
  const canvasRef = useRef(null);
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"error" | "success" | "">("");

  // Draw CAPTCHA on Canvas
  const drawCaptcha = (text: string) => {
    const canvas: any = canvasRef.current;
    console.log(canvas)
    const ctx = canvas.getContext("2d");
  
    const letterSpacing = 20;
    const padding = 20;
    canvas.width = text.length * letterSpacing + padding; // <-- dynamic width
    canvas.height = 40;
  
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.font = "24px Arial";
    ctx.fillStyle = "#333";
    ctx.textBaseline = "middle";
  
    for (let i = 0; i < text.length; i++) {
      const angle = Math.random() * 0.4 - 0.2;
      ctx.save();
      ctx.translate(letterSpacing * i + 15, 20); // Adjusted a bit
      ctx.rotate(angle);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  };
  

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptchaText();
    setCaptcha(newCaptcha);
    drawCaptcha(newCaptcha);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const first_name = formData.get("first_name")?.toString().trim() || "";
    const last_name = formData.get("last_name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    // --- Validation ---
    if (first_name.length > 255) {
      setAlertType("error");
      setAlertMessage("First name cannot be more than 255 characters.");
      return;
    }

    if (first_name.length > 255) {
      setAlertType("error");
      setAlertMessage("Last name cannot be more than 255 characters.");
      return;
    }

    if (password.length < 8) {
      setAlertType("error");
      setAlertMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!email) {
      setAlertType("error");
      setAlertMessage("Email is required.");
      return;
    }

    if (captchaInput !== captcha) {
      setAlertType("error");
      setAlertMessage("Invalid CAPTCHA. Please try again.");
      refreshCaptcha();
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, phone, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertType("success");
        setAlertMessage("Registration successful!");
        form.reset();
        setCaptchaInput("");
      } else {
        if (data?.error?.includes("email has already been taken")) {
          setAlertType("error");
          setAlertMessage(
            "Email is already registered. Please use another one."
          );
        } else {
          setAlertType("error");
          setAlertMessage(data?.error || "Registration failed.");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      console.log("Error during registration:", error);
      // alert("Something went wrong. Please try again later.");
    }
  }

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
        setAlertType("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  return (
    <>
      <Navbar />
      <MainNavbar />
      <Card
        color="transparent"
        shadow={false}
        className="items-center shadow-lg mt-4"
        {...({} as React.ComponentProps<typeof Card>)}
      >
        <Typography
          variant="h4"
          color="blue-gray"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          Create Account
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          Nice to meet you! Enter your details to register.
        </Typography>
       
        <form
          className="mt-8 mb-8 w-80 max-w-screen-lg sm:w-full shadow-xl p-4 ring-2 ring-gray-500/50 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              First Name
            </Typography>
            <Input
              size="lg"
              type="text"
              name="first_name"
              placeholder="First Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              Last Name
            </Typography>
            <Input
              size="lg"
              type="text"
              name="last_name"
              placeholder="Last Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              Email
            </Typography>
            <Input
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              Phone
            </Typography>
            <Input
              size="lg"
              type="number"
              name="phone"
              placeholder="9836348346"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              name="password"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Input>)}
            />
            {/* CAPTCHA Section */}
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              CAPTCHA
            </Typography>
            <canvas ref={canvasRef} className="mb-2 border border-gray-300 w-40" />

            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter the above CAPTCHA"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                {...({} as React.ComponentProps<typeof Input>)}
              />
              <button
                type="button"
                onClick={refreshCaptcha}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Refresh
              </button>
            </div>
            {/* <div className="mt-2 p-2 bg-gray-100 text-center rounded">
              {captcha}
            </div> */}
          </div>
          <Checkbox
            {...({} as React.ComponentProps<typeof Checkbox>)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="items-center font-normal"
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                By clicking SIGN UP, I agree to Bookwindow&apos;s
                <a
                  href="terms"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms of Use
                </a>
                &nbsp;and
                <a
                  href="privacy-policy"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Privacy Policy
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-6"
            fullWidth
            type="submit"
            {...({} as React.ComponentProps<typeof Button>)}
          >
            sign up
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Already have an account?{" "}
            <a href="sign-in" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
        {alertMessage && (
          <Alert
            color={alertType === "error" ? "red" : "green"}
            className="mb-4"
            onClose={() => setAlertMessage("")}
          >
            {alertMessage}
          </Alert>
        )}
      </Card>
      <Footer />
    </>
  );
}
