"use client";

import { useEffect, useState } from "react";
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
          url: `${config.apiUrl}api/cart/orders/24464`,
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

  useEffect(() => {}, [session, cartItems, items_count]);

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
    return subtotal;
  };

  return (
    <>
      <Navbar items_count={items_count} />
      <MainNavbar />
      <section className="bg-white py-8 md:py-16 mb-4">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Your Orders
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {/* Cart Items */}
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-5 gap-6 px-4 md:px-6 py-2 text-sm font-semibold text-gray-600 border-b border-gray-300">
                  <div>#</div>
                  <div>Product</div>
                  <div className="text-center">Unit Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-end">Total</div>
                </div>
                {/* {cartItems?.length &&
                  cartItems?.map((item) => ( */}
                {/* Product Item */}
                <div
                  key={`item.product_id`}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                >
                  <div className="grid grid-cols-5 gap-6 items-center">
                    {/* Image */}
                    <img
                      className="h-20 w-20 object-cover"
                      src={`${config.apiUrl}storage/${`item.image`}`}
                      alt={`item.product_name`}
                      width={80}
                      height={80}
                    />

                    {/* Product Name */}
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline"
                      >
                        {`item.product_name`}
                      </a>
                    </div>

                    {/* Unit Price */}
                    <div className="text-center text-base font-bold text-gray-900">
                      ₹{`item.product_price`}
                    </div>

                    {/* Quantity */}
                    <div className="text-center text-base font-bold text-gray-900">
                      {`item.quantity`}
                    </div>

                    {/* Total */}
                    <div className="text-end text-base font-bold text-gray-900">
                      ₹{`item.product_price * item.quantity`}
                    </div>
                  </div>
                </div>
                {/* ))} */}
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
                    <dt className="text-base font-normal text-gray-900">
                      Order ID
                    </dt>
                    <dd className="text-base font-medium text-gray-500">
                      987939
                    </dd>
                  </dl>

                  <dl className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-normal text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-500">
                      ₹{calculateTotal()}
                    </dd>
                  </dl>
                  <dl className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-normal text-gray-900">
                      Order Status
                    </dt>
                    <dd className="text-base font-bold text-gray-500">
                      Pending
                    </dd>
                  </dl>
                  <dl className="flex justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-base font-normal text-gray-900">
                      Ordered On
                    </dt>
                    <dd className="text-base font-bold text-gray-500">
                      16/04/2025
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
