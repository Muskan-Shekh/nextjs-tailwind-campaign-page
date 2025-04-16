"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { NotificationDialog } from "@/components/notification";
import config from "../config";
import axios from "axios";
import React from "react";
import { ThankYouDialog } from "@/components/thank-you-popup";

export default function Checkout() {
  interface CartItem {
    product_id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    image: string;
    subtotal?: number;
    product_weight?: number | any;
  }
  const [deliveryType, setDeliveryType] = useState("free");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [session, setSession] = useState("");
  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const [items_count, setItemsCount] = useState(0);

  const [email, setEmail] = useState("");
  const [userFound, setUserFound] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [open, setOpen] = React.useState(false);
  const errorPopup = () => setOpen(!open);

  const [isOpen, setIsOpen] = React.useState(false);
  const thankYouPopup = () => setOpen(!open);

  const checkSession = async () => {
    const res = await fetch("/api/debug", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    setSession(data?.session_id);
    // console.log("Session info:", data);
  };

  useEffect(() => {
    const viewCart = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/cart/viewcart?session_id=${session}`,
          responseType: "json",
        });
        const data = response?.data;
        console.log("checkout list", data);
        setCartItems(data?.items);
        setItemsCount(data?.items_count);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    viewCart();
  }, [session]);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {}, [session, cartItems, items_count]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setUserFound(null);
    setErrorMessage("");
    setIsBuffering(true);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      checkUser(value);
    }, 500); // 500ms delay after stop typing

    setDebounceTimeout(timeout);
  };

  // API call
  const checkUser = async (emailToCheck: string) => {
    try {
      const response = await axios.post(
        "https://admin.bookwindow.in/api/v1/checkuser",
        {
          email: emailToCheck,
        }
      );

      if (response.data.success) {
        setUserFound(true);
        setErrorMessage("");
      } else if (response.data.error) {
        setUserFound(false);
        setErrorMessage("This email is not registered with us.");
      }
    } catch (error) {
      console.error("API error:", error);
      setUserFound(false);
      setErrorMessage("This email is not registered with us.");
      // setErrorMessage('Something went wrong');
    } finally {
      setIsBuffering(false);
    }
  };
  // const payload = {
  //   session_id: session,
  //   shipping_method: paymentMethod,
  //   address,
  //   address_2,
  //   email,
  //   is_guest: userFound ? false : true,
  //   phone,
  //   first_name,
  //   last_name,
  //   city,
  //   state,
  //   zip_code,
  //   country,
  // };
  const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const formData = new FormData(event.currentTarget);
      const first_name = formData.get("first_name")?.toString().trim() || "";
      const last_name = formData.get("last_name")?.toString().trim() || "";
      const phone = formData.get("phone")?.toString().trim() || "";
      // const email = formData.get("email")?.toString().trim() || "";
      const city = formData.get("city")?.toString() || "";
      const state = formData.get("state")?.toString() || "";
      const country = formData.get("country")?.toString() || "";
      const zip_code = formData.get("zip_code")?.toString() || "";
      const address = formData.get("address")?.toString() || "";
      const address_2 = formData.get("address_2")?.toString() || "";

      const response = await fetch(`${config.apiUrl}api/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          session_id: session,
          shipping_method: deliveryType,
          address: address,
          address_2: address_2,
          email: email,
          is_guest: userFound ? false : true,
          phone: phone,
          first_name: first_name,
          last_name: last_name,
          city: city,
          state: state,
          zip_code: zip_code,
          country: country,
        }),
      });
      const result = await response.json();
      console.log("Place order", result);
      if (result.message == "Your cart is empty") {
        setOpen(true);
        // errorPopup();
      }
    } catch (error) {
      setOpen(true);
      // errorPopup();
      console.log("Error in :", error);
    }
  };

  // Function to return shipping cost as a number
  const calculateShippingValue = (weightInGrams: number): number => {
    if (deliveryType === "free") return 0;

    let shipping = 49;
    if (weightInGrams <= 500) return shipping;

    const extraWeight = weightInGrams - 500;
    const increments = Math.ceil(extraWeight / 200);
    shipping += increments * 25;

    return shipping;
  };

  // Function to return shipping as a formatted string
  const calculateShipping = (weightInGrams: number): string => {
    const value = calculateShippingValue(weightInGrams);
    return deliveryType === "free" ? "Free" : `₹${value}`;
  };

  const totalWeight = cartItems?.reduce(
    (acc, item) => acc + item.product_weight * items_count,
    0
  );

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <MainNavbar />
      {/* Shipping Details */}
      <form
        className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-4"
        onSubmit={handlePlaceOrder}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-2 rounded border-gray-400 mb-2"
              required
              value={email}
              onChange={handleEmailChange}
            />

            {/* Buffering Spinner */}
            {isBuffering && (
              <p className="text-blue-500 text-sm mb-2">Checking email...</p>
            )}

            {/* Error Message */}
            {userFound === false && !isBuffering && (
              <>
                <p className="text-gray-600 text-sm mb-2">{errorMessage}</p>
                {errorMessage && (
                  <div className="flex gap-2 p-2 mt-2">
                    <a
                      href="/registration"
                      className="bg-gray-800 text-white p-3 rounded hover:bg-gray-900"
                    >
                      Register
                    </a>
                    <button
                      onClick={() => setErrorMessage("")}
                      className="bg-gray-800 text-white p-3 rounded hover:bg-gray-900"
                    >
                      Continue as guest
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Password Input */}
            {userFound === true && !isBuffering && (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="w-full border p-2 rounded border-gray-400"
                  required
                />
                <div className="flex gap-2 p-2 mt-2">
                  <button
                    type="button"
                    className="bg-gray-800 text-white p-3 rounded hover:bg-gray-900"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setUserFound(false)}
                    className="bg-gray-800 text-white p-3 rounded hover:bg-gray-900"
                  >
                    Continue as guest
                  </button>
                </div>
              </>
            )}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                className="border p-2 rounded border-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                className="border p-2 rounded border-gray-400"
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone"
              className="w-full border p-2 rounded border-gray-400"
              required
            />
            <input
              type="text"
              placeholder="Address 1"
              name="address"
              className="w-full border p-2 rounded border-gray-400"
              required
            />
            <input
              type="text"
              placeholder="Address 2 (Optional)"
              name="address_2"
              className="w-full border p-2 rounded border-gray-400"
            />
            <div className="grid grid-cols-3 gap-4">
              <select
                className="border p-2 rounded w-full border-gray-400"
                name="state"
              >
                <option>State</option>
                <option>Andaman & Nicobar</option>
                <option>Delhi</option>
              </select>
              <select
                className="border p-2 rounded w-full border-gray-400"
                name="city"
              >
                <option>City</option>
                <option value="Adilabad">Adilabad</option>
                <option value="Delhi">Delhi</option>
              </select>
              <input
                type="text"
                placeholder="Postcode"
                name="zip_code"
                className="border p-2 rounded border-gray-400"
                required
              />
            </div>
            <select
              className="border p-2 rounded w-full border-gray-400"
              name="country"
            >
              <option defaultValue="India">India</option>
            </select>
          </div>
        </div>

        {/* Order Summary */}
        {/* <form onSubmit={handlePlaceOrder}> */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>
          <div className="border-b pb-4 mb-4 border-gray-400">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl mb-4">
              <div className="space-y-6">
                {cartItems?.map((item) => (
                  <div
                    key={item.product_id}
                    className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm md:p-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <img
                        className="h-20 w-20"
                        src={`${config.apiUrl}storage/${item.image}`}
                        alt={item.product_name}
                        width={40}
                        height={40}
                      />

                      <div className="w-full min-w-0 flex-1 space-y-4">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {item.product_name} × {item.quantity}
                        </a>
                      </div>

                      {/* Quantity & Price */}
                      <div className="text-end w-32">
                        <p className="text-base font-bold text-gray-900">
                          {/* ₹{item.price * item.quantity} */}₹{item.subtotal}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between border-b pb-4 border-gray-400">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {/* <div className="flex justify-between border-b pb-4 border-gray-400">
              <span>Items weight</span>
              <span>
                {cartItems?.reduce(
                  (acc, item) => item.product_weight * items_count,
                  0
                )}
                gm
              </span>
            </div> */}
            <div className="flex justify-between border-b pb-4 border-gray-400">
              <span>Shipping</span>
              <span>{calculateShipping(totalWeight)}</span>
              {/* if weight <=500 then shipping = ₹49 , if weight is going 200 more i.e. 700 then shipping = shipping+25, if weight is going 200 more i.e. 900 then shipping = shipping+25 and so on...*/}
            </div>

            {/* <div className="flex justify-between border-b pb-4 border-gray-400">
              <span>COD Charge</span>
              <span>₹49</span>
            </div> */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>
                ₹
                {deliveryType === "free"
                  ? subtotal
                  : subtotal + calculateShippingValue(totalWeight)}
              </span>
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
                  checked={deliveryType === "free"}
                  onChange={() => setDeliveryType("free")}
                />{" "}
                Free Delivery
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "standard"}
                  onChange={() => setDeliveryType("standard")}
                />{" "}
                Standard Delivery
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

          <button
            // type="submit"
            onClick={() => {
              open ? errorPopup : thankYouPopup;
              handlePlaceOrder;
            }}
            className="w-full bg-gray-800 text-white p-3 rounded hover:bg-gray-900"
          >
            Place Order
          </button>
          {open && (
            <NotificationDialog
              open={open}
              handleOpen={errorPopup}
            ></NotificationDialog>
          )}
          {open && (
            <ThankYouDialog
              open={isOpen}
              handleOpen={thankYouPopup}
            ></ThankYouDialog>
          )}
        </div>
      </form>
      <Footer />
    </>
  );
}
