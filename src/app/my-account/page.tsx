"use client";

// components/AccountPage.tsx
import Footer from "@/components/footer";
import MainNavbar from "@/components/main-navbar";
import Navbar from "@/components/navbar";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import config from "../config";
// types/account.ts
type AccountTab =
  | "dashboard"
  | "orders"
  | "addresses"
  | "payment-methods"
  | "account-details"
  | "password"
  | "logout";

interface TabItem {
  key: AccountTab;
  label: string;
}
// import { AccountTab, TabItem } from '../types/account';
// import { DashboardTab, OrdersTab, PasswordTab, AddressesTab, PaymentMethodsTab, AccountDetailsTab } from './tabs';

const tabs: TabItem[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "orders", label: "Orders" },
  { key: "addresses", label: "Addresses" },
  { key: "payment-methods", label: "Payment methods" },
  { key: "account-details", label: "Account details" },
  { key: "password", label: "Password" },
  { key: "logout", label: "Log out" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("dashboard");
  const [access_token, setAccessToken] = useState<string | null>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [userOrders, setUserOrders] = useState([] as any);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      const customerData = localStorage.getItem("customer");

      setAccessToken(token);
      setCustomer(customerData ? JSON.parse(customerData) : null);
    }
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("customer");
      localStorage.clear();
      window.location.reload();
    }
  };
  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/user_order/${customer?.id}`,
          responseType: "json",
        });
        const orders = response?.data;
        console.log("orders", orders?.data);
        setUserOrders(orders?.data);
      } catch (error) {
        // setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchOrdersData();
  }, [customer?.id]);

  useEffect(() => {}, [userOrders]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab customer={customer} logout={logout} />;
      case "orders":
        return <OrdersTab userOrders={userOrders} />;
      case "password":
        return <PasswordTab customer={customer}/>;
      case "addresses":
        return <AddressesTab />;
      case "payment-methods":
        return <PaymentMethodsTab />;
      case "account-details":
        return <AccountDetailsTab customer={customer} />;
      case "logout":
        return <div className="p-4">You have been logged out.</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <MainNavbar />
      <div className="container mx-auto flex  min-h-screen max-w-screen-xl px-2 pt-8 2xl:px-0 shadow-xl">
        <aside className="w-64 border-r p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  if (tab.key === "logout") {
                    logout();
                  }
                }}
                className={`block w-full text-left p-2 rounded hover:bg-gray-100  border-b ${
                  activeTab === tab.key ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">{renderTabContent()}</main>
      </div>
      <Footer />
    </>
  );
}

// components/tabs/DashboardTab.tsx
function DashboardTab({ customer, logout }: any) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Hello <strong>{customer?.first_name}</strong> (not{" "}
        <strong>{customer?.first_name}</strong>?{" "}
        <a href="/" onClick={() => logout()} className="text-blue-600">
          Log out
        </a>
        )
      </p>
      <p className="mt-2">
        From your account dashboard you can view your{" "}
        <a href="#" className="text-blue-600">
          recent orders
        </a>
        , manage your{" "}
        <a href="#" className="text-blue-600">
          shipping and billing addresses
        </a>
        , and{" "}
        <a href="#" className="text-blue-600">
          edit your password and account details
        </a>
        .
      </p>
    </div>
  );
}

// components/tabs/OrdersTab.tsx
function OrdersTab({ userOrders }: any) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="p-2 border">Order</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userOrders?.orders?.map((order:any) => (
            <tr key={order.id}>
              <td className="p-2 border">#{order?.order_details?.order_number}</td>
              <td className="p-2 border">{order?.order_details?.created_at}</td>
              <td className="p-2 border">{order?.order_details?.status}</td>
              <td className="p-2 border">{order?.order_details?.total_amount} for {order?.items.length} items</td>
              <td className="p-2 border">
                <a
                  href={`/view-orders?order_number=${order?.order_details?.order_number}`}
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// components/tabs/PasswordTab.tsx
function PasswordTab({customer}:any) {

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = customer?.email;
    const password_confirmation = formData.get("password_confirmation")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";
    const response = await fetch(`${config.apiUrl}api/v1/passwordchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, password_confirmation }),
    });
    if (response.ok) {
      const data = await response.json();
      alert("password updated!")
    } else{
      console.log("something went wrong!!")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Password</h1>
      <form className="space-y-4" onSubmit={changePassword}>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            defaultValue="12345678"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            defaultValue="12345678"
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-black text-white px-3 py-1 rounded">
          Save changes
        </button>
      </form>
    </div>
  );
}

// components/tabs/AddressesTab.tsx
function AddressesTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Addresses</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Billing Address</h2>
        <p>
          Muskan Shekh
          <br />
          Jaipur, Rajasthan 302002
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Shipping Address</h2>
        <p>You have not set up this type of address yet.</p>
      </div>
    </div>
  );
}

// components/tabs/PaymentMethodsTab.tsx
function PaymentMethodsTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
      <p>No saved payment methods yet.</p>
    </div>
  );
}

// components/tabs/AccountDetailsTab.tsx
function AccountDetailsTab({ customer }: any) {
  async function updateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = customer?.email;
    const first_name = formData.get("password_confirmation")?.toString().trim() || "";
    const lastname = formData.get("password")?.toString() || "";
    const response = await fetch(`${config.apiUrl}api/v1/updateuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, first_name, lastname }),
    });
    if (response.ok) {
      const data = await response.json();
      // console.log("yy",data)
      alert("user updated!")
    } else{
      console.log("something went wrong!!")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      <form className="space-y-4" onSubmit={updateUser}>
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="first_name"
            defaultValue={customer?.first_name}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            defaultValue={customer?.last_name}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Display Name</label>
          <input
            type="text"
            defaultValue={customer?.first_name}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            defaultValue={customer?.email}
            className="w-full border p-2"
            disabled
          />
        </div>
        <div>
          <button type="submit" className="bg-black text-white px-3 py-1 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
