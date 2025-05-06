"use client";

import { FormEvent, useEffect, useState } from "react";
import config from "@/app/config";
import axios from "axios";
import React from "react";

type CheckoutProps = {
  onBack: () => void;
  onNext: (data: any) => void; // <-- accept data here
  formData: any;
  onCustomerData: (data: any) => void;
  shippingData?: any;
};

export default function Checkout({
  onNext,
  onBack,
  formData,
  onCustomerData,
  shippingData,
}: CheckoutProps) {
  // console.log("shippingData",shippingData)
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
  const [customer, setCustomer] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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

  const [formValues, setFormValues] = useState(formData);

  useEffect(() => {
    setFormValues(formData);
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
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
      const response = await axios.post(`${config.apiUrl}api/v1/checkuser`, {
        email: emailToCheck,
      });

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
      setCustomerData(data);
      onCustomerData(data);
      // setPassword("");
      // setEmail("");
      setItemsCount(0);
    } else {
      const data = await response.json();
      console.error("Login failed", response.status);
      alert(data?.error);
    }
  }

  // useEffect(() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     customerData?.access_token &&
  //     customerData?.customer
  //   ) {
  //     localStorage.setItem("access_token", customerData.access_token);
  //     localStorage.setItem("customer", JSON.stringify(customerData.customer));
  //   }
  // }, [customerData]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const token = localStorage.getItem("access_token");
  //     const customerData = localStorage.getItem("customer");
  //     if (customerData && token) {
  //       // setAccessToken(token);
  //       setCustomer(customerData ? JSON.parse(customerData) : null);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (customerData?.access_token && customerData?.customer) {
      localStorage.setItem("access_token", customerData.access_token);
      localStorage.setItem("customer", JSON.stringify(customerData.customer));
      setCustomer(customerData.customer); // Optionally update state immediately
    } else {
      const token = localStorage.getItem("access_token");
      const storedCustomer = localStorage.getItem("customer");

      if (token && storedCustomer) {
        setCustomer(JSON.parse(storedCustomer));
      }
    }
  }, [customerData]);

  useEffect(() => {
    const source =
      shippingData && Object.keys(shippingData).length > 0
        ? shippingData
        : customer;
    // console.log("source",source)
    if (!source) return; // nothing to set

    // Optional: Prevent overwriting form if already populated
    setFormValues((prev: any) => {
      const alreadyFilled = Object.keys(prev).some((key) => prev[key]);
      if (alreadyFilled) return prev; // do not overwrite
      return {
        ...prev,
        first_name: source.first_name || "",
        last_name: source.last_name || "",
        phone: source.phone || "",
        address: source.address || "",
        address_2: source.address_2 || "",
        zip_code: source.zip_code || "",
        state: source.state || "",
        city: source.city || "",
      };
    });
  }, [shippingData, customer]);

  // const handlePlaceOrder = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const form = event.currentTarget;
  //     const formData = new FormData(event.currentTarget);
  //     const first_name = formData.get("first_name")?.toString().trim() || "";
  //     const last_name = formData.get("last_name")?.toString().trim() || "";
  //     const phone = formData.get("phone")?.toString().trim() || "";
  //     const city = formData.get("city")?.toString() || "";
  //     const state = formData.get("state")?.toString() || "";
  //     const country = formData.get("country")?.toString() || "";
  //     const zip_code = formData.get("zip_code")?.toString() || "";
  //     const address = formData.get("address")?.toString() || "";
  //     const address_2 = formData.get("address_2")?.toString() || "";

  //     const response = await fetch(`${config.apiUrl}api/cart/checkout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         session_id: session,
  //         shipping_method: deliveryType,
  //         address: address,
  //         address_2: address_2,
  //         email: email,
  //         password: password ? password : "",
  //         is_guest: userFound ? false : true,
  //         phone: phone,
  //         first_name: first_name,
  //         last_name: last_name,
  //         city: city,
  //         state: state,
  //         zip_code: zip_code,
  //         country: country,
  //       }),
  //     });
  //     const result = await response.json();
  //     if (response.ok) {
  //       console.log("Place order", result);
  //       setOrderNumber(result?.order_number);
  //       form.reset();
  //     }
  //     if (result.message == "Your cart is empty") {
  //       setOpen(true);
  //       // errorPopup();
  //     }
  //   } catch (error) {
  //     setOpen(true);
  //     // errorPopup();
  //     console.log("Error in :", error);
  //   }
  // };

  // const handleNext = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const requiredFields = ["first_name", "last_name", "phone", "address", "zip_code"];
  //   for (const field of requiredFields) {
  //     if (!formValues[field as keyof typeof formValues]?.trim()) {
  //       alert(`${field} is required`);
  //       return;
  //     }
  //   }

  //   const data = {
  //     ...formValues,
  //     email: email || formData?.email,
  //     password: password ? password : "",
  //     is_guest: !password,
  //   };

  //   onNext(data); // Pass data to parent
  // };
  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields = [
      "first_name",
      "last_name",
      "phone",
      "address",
      "zip_code",
    ];

    for (const field of requiredFields) {
      const value =
        formValues[field as keyof typeof formValues] ||
        customer?.[field as keyof typeof customer];
      if (!value?.toString().trim()) {
        alert(`${field.replace(/_/g, " ")} is required`);
        return;
      }
    }

    const source =
      formValues && Object.keys(formValues).length > 0 ? formValues : customer;

    const data = {
      ...source,
      email: email || formData?.email || customer?.email || "",
      password: password || "",
      is_guest: !password,
    };

    onNext(data);
  };

  return (
    <>
      <form
        className="container mx-auto p-6 grid grid-cols-1 gap-8 mb-8 mt-4 max-w-screen-md"
        // onSubmit={handlePlaceOrder}
        onSubmit={handleNext}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={() => setIsEdit(!isEdit)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
          </div>
          {!isEdit && customer ? (
            <div className="text-sm space-y-1 leading-relaxed p-4 border border-1 border-yellow-900">
              <p>
                {shippingData?.first_name || customer?.first_name}{" "}
                {shippingData?.last_name || customer?.last_name}
              </p>
              <p>{shippingData?.address || customer?.address}</p>
              <p>{shippingData?.city || customer?.city}</p>
              <p>{shippingData?.zip_code || customer?.zip_code}</p>
              <p>{shippingData?.state || customer?.state}</p>
              <p>{shippingData?.phone || customer?.phone}</p>
              <div className="text-end">
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-transparent text-black p-2 rounded hover:border-yellow-900 mt-4 border border-1 border-gray-500"
                >
                  Edit 🖊️
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {!customer && (
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border p-2 rounded border-gray-400 mb-2"
                  required
                  value={email || formData?.email}
                  onChange={handleEmailChange}
                />
              )}

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
                  value={formValues.first_name}
                  onChange={handleInputChange}
                  className="border p-2 rounded border-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={formValues.last_name}
                  onChange={handleInputChange}
                  className="border p-2 rounded border-gray-400"
                  required
                />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                className="w-full border p-2 rounded border-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Address 1"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                className="w-full border p-2 rounded border-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Address 2 (Optional)"
                name="address_2"
                value={formValues.address_2}
                onChange={handleInputChange}
                className="w-full border p-2 rounded border-gray-400"
              />
              <div className="grid grid-cols-3 gap-4">
                <select
                  className="border p-2 rounded w-full border-gray-400"
                  name="state"
                  value={formValues.state}
                  onChange={handleInputChange}
                >
                  <option defaultValue={customer?.state || ""}>
                    {customer?.state || "State"}
                  </option>
                  <option value="Andaman & Nicobar">Andaman & Nicobar</option>
                  <option value="Delhi">Delhi</option>
                </select>
                <select
                  className="border p-2 rounded w-full border-gray-400"
                  name="city"
                  value={formValues.city}
                  onChange={handleInputChange}
                >
                  <option defaultValue={customer?.city || ""}>
                    {customer?.city || "City"}
                  </option>
                  <option value="Adilabad">Adilabad</option>
                  <option value="Delhi">Delhi</option>
                </select>
                <input
                  type="text"
                  placeholder="Postcode"
                  name="zip_code"
                  value={formValues.zip_code}
                  onChange={handleInputChange}
                  className="border p-2 rounded border-gray-400"
                  required
                />
              </div>
              <select
                className="border p-2 rounded w-full border-gray-400"
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
              >
                <option defaultValue="India">India</option>
              </select>
            </div>
          )}
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="w-60 bg-gray-800 text-white p-3 rounded hover:bg-gray-900 mt-4"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-60 bg-gray-800 text-white p-3 rounded hover:bg-gray-900 mt-4"
            >
              Next
            </button>
          </div>
        </div>
        {/* order summary section was here */}
      </form>
    </>
  );
}
