"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { useRouter } from "next/navigation";
import config from "@/app/config";
import axios from "axios";
import { Button, Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import Checkout from "../checkout/page";
import { ThankYouDialog } from "@/components/thank-you-popup";
import { NotificationDialog } from "@/components/notification";
import { CheckIcon } from "@heroicons/react/24/solid";

interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
  product_weight: number;
  subtotal: number;
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
const steps = ["cart", "shipping", "order"];
export default function ShoppingCart() {
  const router = useRouter();
  const [session, setSession] = useState("");
  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const [items_count, setItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  //for placeorder
  const [activeTab, setActiveTab] = useState("cart");
  const [deliveryType, setDeliveryType] = useState("free");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderNumber, setOrderNumber] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const errorPopup = () => setOpen(!open);
  const [isOpen, setIsOpen] = useState(false);
  const thankYouPopup = () => setIsOpen(!isOpen);
  const getStepStatus = (step: string) => {
    const index = steps.indexOf(step);
    const activeIndex = steps.indexOf(activeTab);

    if (index < activeIndex) return "completed";
    if (index === activeIndex) return "active";
    return "upcoming";
  };
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
      setLoading(true);
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/cart/viewcart?session_id=${session}`,
          responseType: "json",
        });
        const data = response?.data;
        setCartItems(data?.items);
        setItemsCount(data?.items_count);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCartItems([]); // fallback to empty array
      } finally {
        setLoading(false); // stop loader
      }
    };
    if (session) {
      viewCart();
    }
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
      // console.log("remove:", result);
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
    setItemsCount(items_count - 1);
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
          // email: email,
          // password: password ? password : "",
          // is_guest: userFound ? false : true,
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

  return (
    <>
      <Navbar items_count={items_count} />
      <MainNavbar />
      <section className="bg-white py-8 md:py-16 mb-4 min-h-screen">
        {loading ? (
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
        ) : !cartItems || cartItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white p-6 shadow-md rounded-xl">
            <div className="mb-6">
              <Image
                src="/image/bag.png"
                alt="Empty Cart"
                width={150}
                height={150}
                className="h-80 w-80"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700">
              Your Cart is{" "}
              <span className="text-red-800 font-bold">Empty!</span>
            </h2>

            <p className="text-gray-500 mt-2">
              Must add items on the cart before you proceed to check out.
            </p>

            <Button
              className="mt-6 px-6 py-3 rounded-full shadow-lg flex bg-red-800"
              onClick={() => router.push("/all-products")}
              {...({} as React.ComponentProps<typeof Button>)}
            >
              <svg
                className="w-6 h-6 text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <p className="mt-1"> Return to Shop</p>
            </Button>
          </div>
        ) : (
          <div className="mx-auto container max-w-screen-xl p-4 2xl:px-0 bg-gray-100">
            {/* <div className="flex items-center justify-center bg-white mx-4 mb-4">
              <Tabs className="w-full" value={activeTab}>
                <TabsHeader
                  className="h-12 bg-transparent"
                  indicatorProps={{
                    className: "!bg-gray-900 rounded-lg",
                  }}
                  {...({} as React.ComponentProps<typeof TabsHeader>)}
                >
                  <Tab
                    value="cart"
                    onClick={() => setActiveTab("cart")}
                    className={`font-medium capitalize transition-all duration-300 rounded-xl px-4 mr-4 whitespace-nowrap ${
                      activeTab === "cart"
                        ? "bg-black text-white"
                        : "bg-transparent text-black"
                    }`}
                    {...({} as any)}
                  >
                    Cart
                  </Tab>
                  <Tab
                    value="shipping"
                    onClick={() => setActiveTab("shipping")}
                    className={`font-medium capitalize transition-all duration-300 rounded-xl px-4 whitespace-nowrap ${
                      activeTab === "shipping"
                        ? "bg-black text-white"
                        : "bg-transparent text-black"
                    }`}
                    {...({} as any)}
                  >
                    Shipping
                  </Tab>
                  <Tab
                    value="order"
                    onClick={() => setActiveTab("order")}
                    className={`font-medium capitalize transition-all duration-300 rounded-xl px-4 whitespace-nowrap ${
                      activeTab === "order"
                        ? "bg-black text-white"
                        : "bg-transparent text-black"
                    }`}
                    {...({} as any)}
                  >
                    Order
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div> */}
            <div className="flex items-center justify-center bg-white mx-4 mb-4 py-4">
              <div className="flex items-center w-full max-w-xl justify-between">
                {steps.map((step, idx) => {
                  const status = getStepStatus(step);
                  const isLast = idx === steps.length - 1;

                  return (
                    <div key={step} className="flex items-center w-full">
                      {/* Step */}
                      <div
                        onClick={() => setActiveTab(step)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
                            status === "active"
                              ? "border-black"
                              : status === "completed"
                              ? "border-green-600"
                              : "border-gray-300"
                          } bg-white`}
                        >
                          {status === "completed" ? (
                            <CheckIcon className="w-4 h-4 text-green-600" />
                          ) : (
                            <div
                              className={`w-[0.5rem] h-[0.5rem] rounded-full ${
                                status === "active" ? "bg-black" : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                        </div>
                        <span
                          className={`font-medium capitalize ${
                            status === "active"
                              ? "text-black"
                              : status === "completed"
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {step}
                        </span>
                      </div>

                      {/* Connector Line */}
                      {!isLast && (
                        <div className="flex-grow h-px border-t border-dotted border-gray-400 mx-2"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {activeTab === "cart" && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl flex ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-bag mt-2 mr-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>{" "}
                  My Cart - ({items_count} Items)
                </h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                  <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-2xl p-4">
                    <div className="space-y-6">
                      {cartItems?.map((item) => (
                        <div
                          key={item.product_id}
                          className="rounded-lg border border-gray-300 shadow-sm bg-white"
                        >
                          <div className="flex flex-wrap items-center justify-between p-4 gap-2">
                            <div>
                              {" "}
                              <img
                                className="h-40 w-40 object-contain rounded-lg"
                                src={`${config.apiUrl}storage/${item.image}`}
                                alt={item.product_name}
                              />
                              <div className="border border-1 px-4 mt-2">
                                <p className="text-sm text-gray-900">
                                  Quantity - {item.quantity}
                                </p>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.product_id,
                                        "decrement"
                                      )
                                    }
                                    className="text-sm cursor-pointer"
                                  >
                                    <svg
                                      className="w-4 h-4 text-gray-600 dark:text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 12h14"
                                      />
                                    </svg>
                                  </button>
                                  <span className="w-10 text-center text-sm font-medium text-gray-900">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.product_id,
                                        "increment"
                                      )
                                    }
                                    className="text-sm cursor-pointer"
                                  >
                                    <svg
                                      className="w-4 h-4 text-gray-600 dark:text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 12h14m-7 7V5"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="w-full min-w-0 flex-1 space-y-4">
                              <p className="text-sm font-[400] text-black">
                                {item.product_name}
                              </p>

                              <div className="flex items-center justify-between gap-4 w-full border-t border-b py-1">
                                <p className="text-sm text-gray-900">
                                  Weight - {item.product_weight}/kg
                                </p>

                                {/* Price aligned to the end/right */}
                                <div className="w-32 text-end">
                                  <p className="text-sm font-bold text-gray-900">
                                    ₹{item.product_price * item.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="border border-top p-4 flex items-center justify-center">
                            <svg
                              onClick={() => removeItem(item.product_id)}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6 text-gray-600 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="min-w-4xl flex-1 p-4">
                    <div className="space-y-4 border border-gray-300  p-4 shadow-sm sm:p-6 bg-white rounded-xl">
                      <p className="text-xl font-semibold text-gray-900 whitespace-nowrap">
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
                              (acc, item) =>
                                acc + item.product_price * item.quantity,
                              0
                            )}
                          </dd>
                        </dl>

                        <dl className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                          <dt className="text-base font-bold text-gray-900">
                            Total
                          </dt>
                          <dd className="text-base font-bold text-gray-900">
                            ₹{calculateTotal()}
                          </dd>
                        </dl>
                      </div>
                      <br />

                      <button
                        className="w-full rounded-lg bg-gray-800 px-5 py-2.5 text-white hover:bg-gray-900 whitespace-nowrap"
                        // onClick={() => router.push("/checkout")}
                        onClick={() => setActiveTab("shipping")}
                      >
                        Proceed to Checkout
                      </button>
                      <br />
                      <br />

                      <a
                        href="/all-products"
                        className="text-center text-sm font-medium text-gray-900 underline"
                      >
                        Continue Shopping
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
            {activeTab === "shipping" && <Checkout setActiveTab={setActiveTab}/>}
            {activeTab === "order" && (
              <div className="container mx-auto p-6 grid grid-cols-1 gap-8 mt-4 bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl flex ml-4">
                  Your Order
                </h2>
                <div className="md:gap-6 lg:flex lg:items-start xl:gap-8 bg-white border border-1 rounded-lg shadow-lg">
                  <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-2xl p-4">
                    <div className="space-y-6">
                      {cartItems?.map((item) => (
                        <div key={item.product_id} className=" bg-white">
                          <div className="flex flex-wrap items-center justify-between p-4 gap-2">
                            <div>
                              {" "}
                              <img
                                className="h-40 w-40 object-contain rounded-lg"
                                src={`${config.apiUrl}storage/${item.image}`}
                                alt={item.product_name}
                              />
                            </div>

                            <div className="w-full min-w-0 flex-1 space-y-4">
                              <p className="text-sm font-[400] text-black">
                                {item.product_name} × {item.quantity}
                              </p>
                              <p className="text-base font-bold text-gray-900">
                                ₹{item.subtotal}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="min-w-4xl flex-1 p-4 ">
                    <div className="space-y-4 ">
                      <p className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                        Order Summary
                      </p>

                      <div className="space-y-4">
                        <dl className="flex justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500">
                            Subtotal
                          </dt>
                          <dd className="text-base font-medium text-gray-900">
                            ₹{subtotal}
                          </dd>
                        </dl>

                        <dl className="flex justify-between gap-4">
                          <dt className="text-base font-normal text-gray-500">
                            Shipping
                          </dt>
                          <dd className="text-base font-medium text-gray-900">
                            {calculateShipping(totalWeight)}
                          </dd>
                        </dl>

                        <dl className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                          <dt className="text-base font-bold text-gray-900">
                            Total
                          </dt>
                          <dd className="text-base font-bold text-gray-900">
                            ₹
                            {deliveryType === "free"
                              ? subtotal
                              : subtotal + calculateShippingValue(totalWeight)}
                          </dd>
                        </dl>
                      </div>
                      {/* Delivery Type */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Delivery Type</h3>
                        <div>
                          <label className="block mb-2">
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
                      <div className="space-y-4">
                        <h3 className="font-semibold">Payment Method</h3>
                        <div>
                          <label className="block mb-2">
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
                          open ? errorPopup() : thankYouPopup();
                          handlePlaceOrder;
                          // thankYouPopup();
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
                      {isOpen && (
                        <ThankYouDialog
                          open={isOpen}
                          handleOpen={thankYouPopup}
                          orderNumber={orderNumber}
                        ></ThankYouDialog>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
