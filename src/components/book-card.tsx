"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { CartPopup } from "@/components/cart-popup";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import ProductDialog from "./product-detail-popup";

interface BookCardProps {
  img: string;
  title: string;
  desc: string;
  category: string;
  price: string;
  offPrice?: string;
  slug?: string;
}

export function BookCard({
  img,
  category,
  title,
  desc,
  price,
  offPrice,
  slug,
}: BookCardProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const popupRef = useRef(null as any);
  const handleOpen = () => setOpen(!open);

  return (
    <Card
      color="transparent"
      shadow={false}
      className="mb-4"
      {...({} as React.ComponentProps<typeof Card>)}
    >
      <CardHeader
        color="gray"
        floated={false}
        className="mx-0 mt-0 mb-6"
        {...({} as React.ComponentProps<typeof CardHeader>)}
      >
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full scale-[1.1] object-cover object-center"
        />
      </CardHeader>
      <CardBody
        className="p-0"
        {...({} as React.ComponentProps<typeof CardBody>)}
      >
        <Typography
          color="blue"
          className="mb-2 text-xs !font-semibold"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {category} % off
        </Typography>
        <a href={`/product-detail/${slug}`}>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-3 font-bold normal-case"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            {title}
          </Typography>
        </a>
        <Typography
          className="mb-4 font-normal !text-gray-500"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {desc}
        </Typography>
        <div className="flex justify-between">
          <div className="flex gap-2">
            {" "}
            <Typography
              variant="h5"
              color="blue-gray"
              className={offPrice ? "line-through" : ""}
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              ₹{price}
            </Typography>
            <Typography
              variant="h5"
              color="red"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              ₹{offPrice}
            </Typography>
          </div>
          <div className="flex gap-2 relative">
            <svg
              onClick={() => setShowPopup(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 hover:border hover:border-red-600 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {/* cart Popup */}
            {showPopup && (
              <CartPopup
                popupRef={popupRef}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
              ></CartPopup>
            )}
            <svg
              onClick={handleOpen}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 hover:border hover:border-black cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            {/* Product popup */}
            {open && (
              <ProductDialog
                open={open}
                handleOpen={handleOpen}
                slug={slug}
              ></ProductDialog>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
export default BookCard;
