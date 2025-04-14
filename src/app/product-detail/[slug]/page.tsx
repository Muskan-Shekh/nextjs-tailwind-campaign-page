"use client";

import { useState, useRef, useEffect } from "react";
// components
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import OtherBookOffers from "@/components/other-book-offers";
import { CartPopup } from "@/components/cart-popup";
import axios from "axios";
import config from "@/app/config";
import Image from "next/image";

export default function ProductDetail({ params }: any) {
  const { slug } = params;
  const [mainImage, setMainImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null as any);
  const [session, setSession] = useState("");
  const [cartData, setCartData] = useState({} as any);

  const handleImageChange = (src: string) => {
    setMainImage(src);
  };

  const [productData, setProductData] = useState([] as any);
  const [similarProducts, setSimilarProducts] = useState([] as any);

  useEffect(() => {
    const fetchProductBySlug = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/products/${slug}`,
          responseType: "json",
        });
        setProductData(response.data?.product);
        setSimilarProducts(response.data?.related_products);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchProductBySlug();
  }, [slug]);

  useEffect(() => {
    setMainImage(`${config.apiUrl}storage/${productData?.image}`);
  }, [productData, similarProducts]);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // const postToSession = async () => {
  //   const res = await fetch("/api/debug", {
  //     method: "POST",
  //     credentials: "include", // required to include cookies
  //   });

  //   const data = await res.json();
  //   console.log("Session POST response:", data);
  // };

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
    checkSession();
  }, []);

  useEffect(() => {}, [session]);

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      const response = await fetch(`${config.apiUrl}api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: productId,
          quantity,
          session_id: session, // pass it manually if backend accepts it
        }),
      });
      const result = await response.json();
      setCartData(result);
      console.log("Cart updated:", result);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // const handleAddToCart = async (productId: string, quantity: number) => {
  //   try {
  //     const response = await fetch("https://admin.bookwindow.in/api/cart/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include", // 👈 this is the key line
  //       body: JSON.stringify({
  //         product_id: productId,
  //         quantity: quantity,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add to cart");
  //     }

  //     const result = await response.json();
  //     console.log("Cart updated:", result);
  //     // alert("Product added to cart!");
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     // alert("Error adding product to cart.");
  //   }
  // };

  return (
    <>
      <Navbar />
      <MainNavbar />
      {/* <div className="bg-gray-100"> */}
      <div className="container mx-auto px-4 py-8 md:flex md:col-12">
        <div className="flex flex-wrap">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-10 mb-8">
            <img
              src={mainImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            {/* gallary image */}
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {productData.gallery?.map((img: string, index: number) => {
                const imgSrc = `${config.apiUrl}storage/${img}`;
                return (
                  <img
                    key={index}
                    src={imgSrc}
                    alt={`Thumbnail ${index + 1}`}
                    className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    onClick={() => handleImageChange(imgSrc)}
                  />
                );
              })}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">{productData?.name}</h2>
            <p className="text-gray-600">Model: {productData?.model}</p>
            <p className="text-gray-600">Author: {productData?.author}</p>
            <p className="text-gray-600 mb-4">
              Publication: {productData?.production?.name}
            </p>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">
                ₹{productData.price}
              </span>
              <span className="text-sm font-small mr-2">
                {(productData?.mrp && productData?.price
                  ? ((productData?.mrp - productData?.price) /
                      productData?.mrp) *
                    100
                  : 0
                ).toFixed(2)}{" "}
                % off
              </span>
              <span className="text-gray-500 line-through">
                ₹{productData.mrp}
              </span>
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

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity: {quantity}
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrease}
                  className="w-8 h-8 bg-gray-300 rounded-full text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-8 h-8 bg-gray-300 rounded-full text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4 mb-6 relative">
              <button
                onClick={() => {
                  setShowPopup(true);
                  // postToSession();
                  handleAddToCart(productData?.id, quantity);
                }}
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
                  cartData ={cartData}
                ></CartPopup>
              )}

              <button className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
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
                By Now
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Stock Quantity: {productData?.quantity}</li>
                <li>
                  Discount:{" "}
                  {(productData?.mrp && productData?.price
                    ? ((productData?.mrp - productData?.price) /
                        productData?.mrp) *
                      100
                    : 0
                  ).toFixed(2)}{" "}
                  %
                </li>
                <li>Book Language: {productData?.book_language}</li>
                <li>Number of Pages: {productData?.number_of_pages}</li>
                <li>Publication Year: {productData?.published_at}</li>
                <li>ISBN: {productData?.isbn || "N/A"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <OtherBookOffers
        description={productData?.description}
        similarProducts={similarProducts}
      />
      <Footer />
    </>
  );
}
