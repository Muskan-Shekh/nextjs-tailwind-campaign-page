"use client";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import config from "../config";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
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
      console.error("Login failed", response.status);
    }
  }

  useEffect(() => {
    const access_token = customerData?.access_token;
    const customer = customerData?.customer;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("customer", JSON.stringify(customer));
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
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 shadow-lg p-4"
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
      <Footer />
    </>
  );
}
