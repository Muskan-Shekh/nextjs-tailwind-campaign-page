"use client";

import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";

export default function Tuitor() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <Card
        color="transparent"
        shadow={false}
        className="items-center mb-4 mt-4"
      >
        <Typography variant="h4" color="blue-gray">
          Tuitor
        </Typography>
        <form className="mt-8 mb-2 w-full max-w-screen-lg shadow-lg p-4">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
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
              Your Phone No.
            </Typography>
            <Input
              size="lg"
              type="number"
              placeholder="9000000033"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Are You
            </Typography>
            <Select label="Are You">
              <Option>Teacher</Option>
              <Option>Parent/Guardian</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Locality
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="your locality"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              City
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="your city"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button className="mt-6" fullWidth>
            Request
          </Button>
        </form>
      </Card>
      <Footer />
    </>
  );
}
