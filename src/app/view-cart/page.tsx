"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { useRouter } from 'next/navigation'
import config from "@/app/config";
import axios from "axios";

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
    price: 1499,
    quantity: 2,
    imageLight: "https://bookwindow.in/assets/images/image/product/14.jpg",
  },
  {
    id: 2,
    name: "Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication",
    price: 598,
    quantity: 1,
    imageLight: "https://bookwindow.in/assets/images/image/product/1.webp",
  },
  {
    id: 3,
    name: "Agriculture Supervisor Exam Guide by Dr. Rajeev & R K Gupta in Hindi Medium",
    price: 1799,
    quantity: 1,
    imageLight: "https://bookwindow.in/assets/images/image/product/90.webp",
  },
];

export default function ShoppingCart() {
  const [session, setSession] = useState("");
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
          console.log("cart list", response?.data)
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
  
    useEffect(() => {}, [session]);

  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, action: "increment" | "decrement") => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === "increment"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const savings = 299;
    const storePickup = 99;
    const tax = 799;
    return subtotal - savings + storePickup + tax;
  };

  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="bg-white py-8  md:py-16 mb-4">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* Cart Items */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6"> 
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm  md:p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <img
                        className="h-20 w-20"
                        src={item.imageLight}
                        alt={item.name}
                        width={80}
                        height={80}
                      />

                      <div className="w-full min-w-0 flex-1 space-y-4">
                        <a
                          href="#"
                          className="text-base font-medium text-gray-900 hover:underline"
                        >
                          {item.name}
                        </a>

                        <div className="flex items-center gap-4">
                          <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
                            ❤️ Add to Favorites
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-medium text-red-600 hover:underline"
                          >
                            ❌ Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, "decrement")}
                          className="h-5 w-5 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          ➖
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "increment")}
                          className="h-5 w-5 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                          ➕
                        </button>
                      </div>

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

            {/* Order Summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-xl font-semibold text-gray-900">
                  Order Summary
                </p>

                <div className="space-y-4">
                  <dl className="flex justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹
                      {cartItems.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </dd>
                  </dl>

                  <dl className="flex justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -₹299
                    </dd>
                  </dl>

                  <dl className="flex justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900">₹99</dd>
                  </dl>

                  <dl className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ₹{calculateTotal()}
                    </dd>
                  </dl>
                </div>

                <button className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-white hover:bg-gray-900" onClick={() => router.push('/checkout')}>
                  Proceed to Checkout
                </button> 

                <a
                  href="/"
                  className="text-center text-sm font-medium text-gray-900 underline"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
