"use client";

import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Navbar from "@/components/navbar";
import MainNavbar from "@/components/main-navbar";
import { Footer } from "@/components/footer";

const orders = [
  {
    id: "ORD-20250411",
    date: "April 11, 2025",
    total: "₹499.00",
    items: [
      { name: "Time Management by Sudhir Bhandari", qty: 1, price: "₹99.00" },
      { name: "CS Executive Guide", qty: 2, price: "₹200.00" },
    ],
  },
  // Add more mock orders as needed
];

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
    name:
      "Agriculture Supervisor Exam Guide by Dr. Rajeev & R K Gupta in Hindi Medium",
    price: 1799,
    quantity: 1,
    imageLight: "https://bookwindow.in/assets/images/image/product/90.webp",
  },
];

export default function MyAccount() {
  const [activeTab, setActiveTab] = React.useState("info");

  const [cartItems, setCartItems] = React.useState<CartItem[]>(
    initialCartItems
  );

  return (
    <>
      <Navbar />
      <MainNavbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <Typography
          variant="h4"
          className="mb-6 text-center"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          My Profile
        </Typography>

        <Tabs value={activeTab}>
          <TabsHeader
            className="bg-gray-100"
            indicatorProps={{ className: "bg-gray-500 shadow-none " }}
            {...({} as React.ComponentProps<typeof TabsHeader>)}
          >
            <Tab
              value="info"
              onClick={() => setActiveTab("info")}
              {...({} as any)}
            >
              User Info
            </Tab>
            <Tab
              value="orders"
              onClick={() => setActiveTab("orders")}
              {...({} as any)}
            >
              My Orders
            </Tab>
            <Tab
              value="summary"
              onClick={() => setActiveTab("summary")}
              {...({} as any)}
            >
              Order Summary
            </Tab>
          </TabsHeader>

          <TabsBody {...({} as React.ComponentProps<typeof TabsBody>)}>
            {/* USER INFO */}
            <TabPanel value="info" {...({} as any)}>
              <Card
                className="mt-4"
                {...({} as React.ComponentProps<typeof Card>)}
              >
                <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
                  <Typography
                    variant="h6"
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Name: John Doe
                  </Typography>
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Email: john@example.com
                  </Typography>
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Phone: +91-9876543210
                  </Typography>
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Address: 123 Book Street, Jaipur, Rajasthan
                  </Typography>
                </CardBody>
              </Card>
            </TabPanel>

            {/* MY ORDERS */}
            <TabPanel value="orders">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cartItems.map((item: any) => (
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
            </TabPanel>

            {/* ORDER SUMMARY */}
            <TabPanel value="summary">
              <Card
                className="mt-4"
                {...({} as React.ComponentProps<typeof Card>)}
              >
                <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
                  <Typography
                    variant="h6"
                    className="mb-2"
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Thank you for your order!
                  </Typography>
                  <Typography
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Your order <strong>ORD-20250411</strong> has been placed
                    successfully.
                  </Typography>
                  <Typography
                    className="mt-2"
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    A confirmation email has been sent to your registered email
                    address.
                  </Typography>
                </CardBody>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}
