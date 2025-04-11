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

export default function Tutor() {
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
        <Typography variant="h4" color="blue-gray" {...({} as React.ComponentProps<typeof Typography>)}>
          Tutor
        </Typography>
        <form className="mt-8 mb-2 w-full max-w-screen-lg shadow-lg p-4">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3" {...({} as React.ComponentProps<typeof Typography>)}>
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
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3" {...({} as React.ComponentProps<typeof Typography>)}>
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
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3" {...({} as React.ComponentProps<typeof Typography>)}>
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
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3" {...({} as React.ComponentProps<typeof Typography>)}>
              Are You
            </Typography>
            <Select label="Are You" {...({} as React.ComponentProps<typeof Select>)}>
              <Option>Teacher</Option>
              <Option>Parent/Guardian</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
            <Typography variant="h6" color="blue-gray" className="-mb-3" {...({} as React.ComponentProps<typeof Typography>)}>
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
              {...({} as React.ComponentProps<typeof Input>)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3" {...({} as React.ComponentProps<typeof Typography>)}>
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
              {...({} as React.ComponentProps<typeof Input>)}
            />
          </div>

          <Button className="mt-6" fullWidth {...({} as React.ComponentProps<typeof Button>)}>
            Request
          </Button>
        </form>
      </Card>
      <Footer />
    </>
  );
}
