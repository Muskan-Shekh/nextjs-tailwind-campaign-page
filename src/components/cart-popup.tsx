"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function CartPopup({ popupRef, setShowPopup, showPopup }: any) {
  const router = useRouter();
  // Function to handle clicks outside the popup
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto-close after 3 seconds
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        clearTimeout(timer);
      };
    }
  }, [popupRef, setShowPopup, showPopup]);

  return (
    <div
      ref={popupRef}
      className="fixed bottom-28 right-4 bg-white shadow-2xl border rounded-lg p-4 w-80 border-green-400 z-40"
    >
      <div className="flex gap-3">
        <img
          src="https://bookwindow.in/assets/images/image/product/1.webp"
          alt="Book"
          className="object-cover rounded-md"
          width={40}
          height={40}
        />
        <div>
          <h2 className="font-semibold text-sm">
            Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication x 1
          </h2>
          <p className="text-gray-600 text-sm mt-1">Added to cart</p>
          <button
            className="mt-2 bg-green-600 text-white text-sm px-4 py-2 rounded-md hover:bg-green-700"
            onClick={() => {
              router.push("/view-cart");
              setShowPopup(false);
            }}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}
