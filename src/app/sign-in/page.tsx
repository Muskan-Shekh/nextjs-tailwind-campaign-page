"use client";

import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import config from "../config";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import ForgotPassword from "@/components/forgot-password";

export default function SignIn() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState({} as any);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"error" | "success" | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password")?.toString() || "";
    if (!email) {
      setAlertType("error");
      setAlertMessage("Email is required.");
      return;
    }

    if (!password) {
      setAlertType("error");
      setAlertMessage("Password is required.");
      return;
    }

    if (password.length < 8) {
      setAlertType("error");
      setAlertMessage("Password must be at least 8 characters long.");
      return;
    }

    const response = await fetch(`${config.apiUrl}api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      setCustomerData(data);
      router.push("/");
    } else {
      const data = await response.json();
      // console.log("Login failed", data);
      if (data?.error === "The provided credentials are incorrect.") {
        setAlertType("error");
        setAlertMessage("The provided credentials are incorrect.");
        return;
      }
      console.error("Login failed", response.status);
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

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      customerData?.access_token &&
      customerData?.customer
    ) {
      localStorage.setItem("access_token", customerData.access_token);
      localStorage.setItem("customer", JSON.stringify(customerData.customer));
    }
  }, [customerData]);

  return (
    <>
      <Navbar />
      <MainNavbar />
      <Card
        color="transparent"
        shadow={false}
        className="items-center mb-4 mt-4"
        {...({} as React.ComponentProps<typeof Card>)}
      >
        <Typography
          variant="h4"
          color="blue-gray"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          Login
        </Typography>
        {alertMessage && (
          <Alert
            color={alertType === "error" ? "red" : "green"}
            className="mb-4"
            onClose={() => setAlertMessage("")}
          >
            {alertMessage}
          </Alert>
        )}
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 shadow-xl p-4 ring-2 ring-gray-500/50 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              Your Email
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
              Password
            </Typography>
            <Input
              type="password"
              name="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Input>)}
            />
          </div>
          <Typography
            className="mt-4 text-center text-red-600 font-normal cursor-pointer"
            {...({} as React.ComponentProps<typeof Typography>)}
            onClick={() => setIsModalOpen(true)}
          >
            Forgot Password?
          </Typography>
          <Button
            className="mt-6"
            fullWidth
            {...({} as React.ComponentProps<typeof Button>)}
            type="submit"
          >
            Login
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Don&apos;t have any account?
            <a href="/registration" className="font-medium text-gray-900">
              Sign Up
            </a>
          </Typography>
        </form>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ForgotPassword />
      </Modal>
      <Footer />
    </>
  );
}
