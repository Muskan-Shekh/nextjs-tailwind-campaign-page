"use client";

import { useState } from "react";
import Image from "next/image";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { NotificationDialog } from "@/components/notification";

export default function Checkout() {
  const [deliveryType, setDeliveryType] = useState("normal");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageLight: string;
  }

  const initialCartItems: CartItem[] = [
    {
      id: 1,
      name: "Utkarsh - Current Affairs Monthly February 2024 By Kumar Gaurav Sir",
      price: 500,
      quantity: 1,
      imageLight: "https://bookwindow.in/assets/images/image/product/14.jpg",
    },
    {
      id: 2,
      name: "Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication",
      price: 700,
      quantity: 1,
      imageLight: "https://bookwindow.in/assets/images/image/product/1.webp",
    },
    {
      id: 3,
      name: "Agriculture Supervisor Exam Guide by Dr. Rajeev & R K Gupta in Hindi Medium",
      price: 400,
      quantity: 1,
      imageLight: "https://bookwindow.in/assets/images/image/product/90.webp",
    },
  ];

  return (
    <>
      <Navbar />
      <MainNavbar />
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-4">
        {/* Shipping Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-2 rounded border-gray-400"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded border-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded border-gray-400"
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border p-2 rounded border-gray-400"
              required
            />
            <input
              type="text"
              placeholder="Address 1"
              className="w-full border p-2 rounded border-gray-400"
              required
            />
            <input
              type="text"
              placeholder="Address 2 (Optional)"
              className="w-full border p-2 rounded border-gray-400"
            />
            <div className="grid grid-cols-3 gap-4">
              <select className="border p-2 rounded w-full border-gray-400">
                <option>State</option>
                <option>Andaman & Nicobar</option>
                <option>Delhi</option>
              </select>
              <select className="border p-2 rounded w-full border-gray-400">
                <option>City</option>
                <option>Adilabad</option>
                <option>Delhi</option>
              </select>
              <input
                type="text"
                placeholder="Postcode"
                className="border p-2 rounded border-gray-400"
                required
              />
            </div>
            <select className="border p-2 rounded w-full border-gray-400">
              <option>Country</option>
              <option>India</option>
            </select>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="border-b pb-4 mb-4 border-gray-400">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl mb-4">
              <div className="space-y-6">
                {initialCartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm md:p-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <Image
                        className="h-20 w-20"
                        src={item.imageLight}
                        alt={item.name}
                        width={40}
                        height={40}
                      />

                      <div className="w-full min-w-0 flex-1 space-y-4">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {item.name} × {item.quantity}
                        </a>
                      </div>

                      {/* Quantity & Price */}
                      <div className="text-end w-32">
                        <p className="text-base font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-400">
              <span>Subtotal</span>
              <span>₹1600</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-400">
              <span>Shipping</span>
              <span>₹300</span>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-400">
              <span>COD Charge</span>
              <span>₹49</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹1949</span>
            </div>
          </div>

          {/* Delivery Type */}
          <div className="mb-4">
            <h3 className="font-semibold">Delivery Type</h3>
            <div>
              <label className="block">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "normal"}
                  onChange={() => setDeliveryType("normal")}
                />{" "}
                Normal Delivery
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "express"}
                  onChange={() => setDeliveryType("express")}
                />{" "}
                Express Delivery
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <h3 className="font-semibold">Payment Method</h3>
            <div>
              <label className="block">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />{" "}
                Cash On Delivery
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />{" "}
                Pay using UPI/Card/Wallet/Netbanking
              </label>
            </div>
          </div>

          {/* <button className="w-full bg-gray-800 text-white p-3 rounded hover:bg-gray-900">
            Place Order
          </button> */}
          <NotificationDialog></NotificationDialog>
        </div>
      </div>
      <Footer />
    </>
  );
}
