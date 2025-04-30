"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { NotificationDialog } from "@/components/notification";
import config from "@/app/config";
import axios from "axios";
import React from "react";
import { ThankYouDialog } from "@/components/thank-you-popup";
type CheckoutProps = {
  setActiveTab: (tab: string) => void;
};
export default function Checkout({ setActiveTab }: CheckoutProps) {
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
  const [customerData, setCustomerData] = useState({} as any);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFound, setUserFound] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [orderNumber, setOrderNumber] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const errorPopup = () => setOpen(!open);
  const [isOpen, setIsOpen] = React.useState(false);
  const thankYouPopup = () => setIsOpen(!isOpen);

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
        // console.log("checkout list", data);
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

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const response = await fetch(`${config.apiUrl}api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      setUserFound(false);
      // console.log("login data", data?.customer);
      setCustomerData(data?.customer);
      setPassword("");
      // setEmail("");
      setItemsCount(0);
    } else {
      const data = await response.json();
      console.error("Login failed", response.status);
      alert(data?.error);
    }
  }

  const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const formData = new FormData(event.currentTarget);
      const first_name = formData.get("first_name")?.toString().trim() || "";
      const last_name = formData.get("last_name")?.toString().trim() || "";
      const phone = formData.get("phone")?.toString().trim() || "";
      // const password = formData.get("password")?.toString().trim() || "";
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
          password: password ? password : "",
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
      if (response.ok) {
        console.log("Place order", result);
        setOrderNumber(result?.order_number);
        form.reset();
      }
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
      {/* <Navbar items_count={items_count}/>
      <MainNavbar /> */}
      {/* Shipping Details */}
      <form
        // className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-4"
        className="container mx-auto p-6 grid grid-cols-1 gap-8 mb-8 mt-4 max-w-screen-md"
        // onSubmit={handlePlaceOrder}
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
                  <>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                      className="w-full border p-2 rounded border-gray-400"
                      required
                    />
                    {!password && (
                      <div className="flex gap-2 p-2 mt-2">
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
              </>
            )}

            {/* Password Input */}
            {userFound === true && !isBuffering && (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="w-full border p-2 rounded border-gray-400"
                  required
                />
                <div className="flex gap-2 p-2 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      const fakeFormEvent = {
                        preventDefault: () => {},
                        currentTarget: document.querySelector(
                          "form"
                        ) as HTMLFormElement,
                      } as unknown as FormEvent<HTMLFormElement>;

                      handleLogin(fakeFormEvent);
                    }}
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
                // value={customerData ? customerData.first_name : ''}
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
              // value={customerData && customerData.address || ''}
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
          <button
            onClick={() => setActiveTab("order")}
            className="w-full bg-gray-800 text-white p-3 rounded hover:bg-gray-900 mt-4"
          >
            Next
          </button>
        </div> 
        {/* order summary section was here */}
      </form>
      {/* <Footer /> */}
    </>
  );
}
