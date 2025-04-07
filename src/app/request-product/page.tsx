"use client";

import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { useState } from "react";
import Image from "next/image";

export default function RequestProduct() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
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
          Request Product
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
              Request
            </Typography>
            <Textarea
              size="lg"
              placeholder="Request"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Textarea>)}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3" {...({} as React.ComponentProps<typeof Typography>)}>
              Remark
            </Typography>
            <Textarea
              size="lg"
              placeholder="Remark"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...({} as React.ComponentProps<typeof Textarea>)}
            />
            <div className="flex flex-col items-center justify-center p-4">
              <label className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition duration-300">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {image ? (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-64 h-64 object-cover rounded-md shadow-md"
                  />
                </div>
              ) : (
                <div className="mt-4">
                  <img
                    src="https://bookwindow.in/assets/images/im-def.png"
                    alt="placeholder-image"
                    className="w-64 h-64 object-cover rounded-md shadow-md"
                  />
                </div>
              )}
            </div>
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
