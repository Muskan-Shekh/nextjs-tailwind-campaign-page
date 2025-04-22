"use client";
import { Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import React from "react";
import config from "../config";
import axios from "axios";

export default function ReturnPolicy() {
  const [returnPolicyData, setReturnPolicyData] = React.useState([] as any);

  React.useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/cms-pages/return-policy`,
          responseType: "json",
        });
        setReturnPolicyData(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchAboutUsData();
  }, []);

  React.useEffect(() => {}, [returnPolicyData]);

  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto px-4 mb-4 mt-10">
        <Typography
          color="black"
          variant="h2"
          className="mb-4"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {returnPolicyData?.title}
        </Typography>
        <Typography
          className="w-full text-gray-600"
          dangerouslySetInnerHTML={{ __html: returnPolicyData?.content }}
          variant="lead"
          {...({} as React.ComponentProps<typeof Typography>)}
        ></Typography>
      </section>
      <Footer />
    </>
  );
}
