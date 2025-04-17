"use client";

// components/AccountPage.tsx
import Footer from "@/components/footer";
import MainNavbar from "@/components/main-navbar";
import Navbar from "@/components/navbar";
import { useState } from "react";
// types/account.ts
export type AccountTab =
  | "dashboard"
  | "orders"
  | "addresses"
  | "payment-methods"
  | "account-details"
  | "password"
  | "logout";

export interface TabItem {
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "orders":
        return <OrdersTab />;
      case "password":
        return <PasswordTab />;
      case "addresses":
        return <AddressesTab />;
      case "payment-methods":
        return <PaymentMethodsTab />;
      case "account-details":
        return <AccountDetailsTab />;
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
                onClick={() => setActiveTab(tab.key)}
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
export function DashboardTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>
        Hello <strong>Muskan</strong> (not <strong>Muskan</strong>?{" "}
        <a href="#" className="text-blue-600">
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
export function OrdersTab() {
  const orders = [
    {
      id: 6491,
      date: "July 19, 2024",
      status: "Processing",
      total: "₹3,328.20 for 2 items",
    },
    {
      id: 6490,
      date: "July 19, 2024",
      status: "Processing",
      total: "₹2,024.10 for 1 item",
    },
    {
      id: 5449,
      date: "July 3, 2024",
      status: "Processing",
      total: "₹1,899.00 for 1 item",
    },
    {
      id: 5447,
      date: "July 3, 2024",
      status: "Processing",
      total: "₹3,699.00 for 1 item",
    },
    {
      id: 2541,
      date: "June 28, 2024",
      status: "Completed",
      total: "₹899.10 for 1 item",
    },
  ];

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
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border">#{order.id}</td>
              <td className="p-2 border">{order.date}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">{order.total}</td>
              <td className="p-2 border">
                <a href="/view-orders" className="bg-black text-white px-3 py-1 rounded">
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
export function PasswordTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Password</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            defaultValue="12345678"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            defaultValue="12345678"
            className="w-full border p-2"
          />
        </div>
        <button className="bg-black text-white px-3 py-1 rounded">
          Save changes
        </button>
      </form>
    </div>
  );
}

// components/tabs/AddressesTab.tsx
export function AddressesTab() {
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
export function PaymentMethodsTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
      <p>No saved payment methods yet.</p>
    </div>
  );
}

// components/tabs/AccountDetailsTab.tsx
export function AccountDetailsTab() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            defaultValue="Muskan"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            defaultValue="Shekh"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Display Name</label>
          <input
            type="text"
            defaultValue="Muskan"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            defaultValue="muskan@gmail.com"
            className="w-full border p-2"
          />
        </div>
        <div>
        <button className="bg-black text-white px-3 py-1 rounded">
          Save changes
        </button>
        </div>
      </form>
    </div>
  );
}
