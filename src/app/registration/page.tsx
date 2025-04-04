"use client";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { useState, useRef, useEffect } from "react";

// Simple CAPTCHA generator
// const generateCaptcha = () => {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let captcha = "";
//   for (let i = 0; i < 6; i++) {
//     captcha += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return captcha;
// };

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
  //   const [captcha, setCaptcha] = useState(generateCaptcha());
  //   const [captchaInput, setCaptchaInput] = useState("");

  //   const refreshCaptcha = () => {
  //     setCaptcha(generateCaptcha());
  //   };

  // Draw CAPTCHA on Canvas
  const drawCaptcha = (text: string) => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 120;
    canvas.height = 40;

    // Background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text Style
    ctx.font = "24px Arial";
    ctx.fillStyle = "#333";
    ctx.textBaseline = "middle";

    // Draw distorted text
    for (let i = 0; i < text.length; i++) {
      const angle = Math.random() * 0.4 - 0.2; // Random rotation
      ctx.save();
      ctx.translate(20 * i + 10, 20);
      ctx.rotate(angle);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Add noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${
        Math.random() * 255
      },0.5)`;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaInput === captcha) {
      alert("CAPTCHA Verified Successfully!");
    } else {
      alert("Invalid CAPTCHA. Please try again.");
      refreshCaptcha();
    }
  };
  return (
    <>
      <Navbar />
      <MainNavbar />
      <Card
        color="transparent"
        shadow={false}
        className="items-center shadow-lg mt-4"
      >
        <Typography variant="h4" color="blue-gray">
          Create Account
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-8 w-80 max-w-screen-lg sm:w-96 shadow-lg p-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Full Name
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="Full Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone
            </Typography>
            <Input
              size="lg"
              type="number"
              placeholder="9836348346"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {/* CAPTCHA Section */}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              CAPTCHA
            </Typography>
            <canvas ref={canvasRef} className="mb-2 border border-gray-300" />

            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter the above CAPTCHA"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
            label={
              <Typography
                variant="small"
                color="gray"
                className="items-center font-normal"
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
          <Button className="mt-6" fullWidth type="submit">
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="sign-in" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
      <Footer />
    </>
  );
}
