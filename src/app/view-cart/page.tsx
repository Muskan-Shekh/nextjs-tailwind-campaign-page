"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { useRouter } from "next/navigation";
import config from "@/app/config";
import axios from "axios";

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

// const initialCartItems: CartItem[] = [
//   {
//     product_id: 1,
//     product_name: "Utkarsh - Current Affairs Monthly February 2024 By Kumar Gaurav Sir",
//     product_price: 1499,
//     quantity: 2,
//     image: "https://bookwindow.in/assets/images/image/product/14.jpg",
//   },
//   {
//     product_id: 2,
//     product_name: "Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication",
//     product_price: 598,
//     quantity: 1,
//     image: "https://bookwindow.in/assets/images/image/product/1.webp",
//   },
//   {
//     product_id: 3,
//     product_name: "Agriculture Supervisor Exam Guide by Dr. Rajeev & R K Gupta in Hindi Medium",
//     product_price: 1799,
//     quantity: 1,
//     image: "https://bookwindow.in/assets/images/image/product/90.webp",
//   },
// ];

export default function ShoppingCart() {
  const router = useRouter();
  const [session, setSession] = useState("");
  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const [items_count, setItemsCount] = useState(0);

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
        // console.log("cart list", data);
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

  useEffect(() => {}, [session, cartItems, items_count, router]);

  const updateCartQuantity = async (productId: number, quantity: number) => {
    try {
      const response = await fetch(`${config.apiUrl}api/cart/cartupdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: productId,
          session_id: session,
          quantity_change: quantity,
        }),
      });
      const result = await response.json();
      // setCartData(result);
      // console.log("updated:", result);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeCartItem = async (productId: number) => {
    try {
      const response = await fetch(`${config.apiUrl}api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: productId,
          session_id: session,
        }),
      });
      const result = await response.json();
      if (result?.success) {
        setItemsCount(items_count - 1);
      }
      // setCartData(result);
      console.log("remove:", result);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = (id: number, action: "increment" | "decrement") => {
    updateCartQuantity(id, action === "increment" ? +1 : -1);
    action === "increment"
      ? setItemsCount(items_count + 1)
      : setItemsCount(items_count - 1);
    setCartItems((prev) =>
      prev.map((item) =>
        item.product_id === id
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
    removeCartItem(id);
    setCartItems(cartItems?.filter((item) => item.product_id !== id));
  };

  const calculateTotal = () => {
    const subtotal = cartItems?.reduce(
      (acc, item) => acc + item.product_price * item.quantity,
      0
    );
    // const savings = 299;
    // const storePickup = 99;
    // const tax = 799;
    // return subtotal - savings + storePickup + tax;
    return subtotal;
  };

  return (
    <>
      <Navbar items_count={items_count} />
      <MainNavbar />
      <section className="bg-white py-8  md:py-16 mb-4">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* Cart Items */}
            {cartItems?.length ? (
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartItems?.map((item) => (
                    <div
                      key={item.product_id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm  md:p-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-6">
                        <img
                          className="h-20 w-20"
                          src={`${config.apiUrl}storage/${item.image}`}
                          alt={item.product_name}
                          width={80}
                          height={80}
                        />

                        <div className="w-full min-w-0 flex-1 space-y-4">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline"
                          >
                            {item.product_name}
                          </a>

                          <div className="flex items-center gap-4">
                            {/* <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
                            ❤️ Add to Favorites
                          </button> */}

                            <button
                              onClick={() => removeItem(item.product_id)}
                              className="text-sm font-medium text-red-600 hover:underline"
                            >
                              ❌ Remove
                            </button>
                          </div>
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, "decrement")
                            }
                            className="h-5 w-5 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            ➖
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product_id, "increment")
                            }
                            className="h-5 w-5 border border-gray-300 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            ➕
                          </button>
                        </div>

                        <div className="text-end w-32">
                          <p className="text-base font-bold text-gray-900">
                            ₹{item.product_price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // <div className="ph-col-12">
              //   <div className="ph-picture"></div>
              // </div>
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>

                <div className="w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>

                <span className="sr-only">Loading...</span>
              </div>
            )}

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
                      {cartItems?.reduce(
                        (acc, item) => acc + item.product_price * item.quantity,
                        0
                      )}
                    </dd>
                  </dl>

                  {/* <dl className="flex justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -₹299
                    </dd>
                  </dl> */}

                  {/* <dl className="flex justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900">₹99</dd>
                  </dl> */}

                  <dl className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ₹{calculateTotal()}
                    </dd>
                  </dl>
                </div>

                <button
                  className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-white hover:bg-gray-900"
                  onClick={() => router.push("/checkout")}
                >
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
