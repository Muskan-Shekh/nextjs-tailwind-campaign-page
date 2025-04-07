"use client";

import React from "react";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { CartPopup } from "@/components/cart-popup";

export default function ProductDialog({ open, handleOpen }: any) {
  const router = useRouter();
  const [showPopup, setShowPopup] = React.useState(false);
  const popupRef = React.useRef(null);

  return (
    <>
      <Dialog
        {...({
          size: "xl",
          open: open,
          handler: handleOpen,
          title: "Dialog Title",
          color: "blue",
          translate: "yes",
          slot: undefined,
          style: {},
        } as any)}
      >
        <DialogHeader
          onClick={handleOpen}
          className="cursor-pointer"
          {...({} as React.ComponentProps<typeof DialogHeader>)}
        >
          X
        </DialogHeader>
        <DialogBody {...({} as React.ComponentProps<typeof DialogBody>)}>
          <div className="container px-4 pb-4 md:flex md:col-12 w-full h-[500px] overflow-auto overflow-y">
            <div className="flex flex-wrap">
              {/* Product Images */}
              <div className="w-full md:w-1/2 px-4">
                <img
                  src="https://i.ytimg.com/vi/SBeaVx1hJwM/maxresdefault.jpg"
                  alt="Product"
                  className="w-full h-full rounded-lg shadow-md mb-4"
                />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 px-4">
                <h2 className="text-3xl font-bold mb-2">
                  Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication
                </h2>
                <p className="text-gray-600">Model: KDP0010</p>
                <p className="text-gray-600">Author: Dr. L.R Bhalla</p>
                <p className="text-gray-600 mb-4">
                  Publication: Kuldeep Publications
                </p>
                <div className="mb-4">
                  <span className="text-2xl font-bold mr-2">₹465 </span>
                </div>

                <div className="flex items-center mb-4">
                  {/* Star Rating */}
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
                </div>

                <div className="flex space-x-4 mb-6 relative">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Add to Cart
                  </button>
                  {/* Popup */}
                  {showPopup && (
                    <CartPopup
                      popupRef={popupRef}
                      setShowPopup={setShowPopup}
                      showPopup={showPopup}
                    ></CartPopup>
                  )}
                  <button
                    onClick={() => router.push("/product-detail")}
                    className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    View Product
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Stock Quantity: 5</li>
                    <li>Discount: 33%</li>
                    <li>Book Language: Hindi</li>
                    <li>Number of Pages: 0</li>
                    <li>Publication Year: 0</li>
                    <li>ISBN: 0</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
