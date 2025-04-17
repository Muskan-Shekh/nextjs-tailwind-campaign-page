"use client";
import { Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import React from "react";
import config from "@/app/config";
import axios from "axios";

export default function BlogDetail({ params }: any) {
  const slug = params.slug;
  const [blogData, setBlogData] = React.useState([] as any);

  React.useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/blog/${slug}`,
          responseType: "json",
        });
        setBlogData(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchBlogDetail();
  }, []);

  React.useEffect(() => {
    // console.log("blogData", blogData);
  }, [blogData]);

  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container min-h-screen mx-auto px-4 mb-4 mt-10 shadow-xl">
        <Typography
          color="black"
          variant="h2"
          className="mb-4 text-center"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {blogData?.title}
        </Typography>
        <hr className="border border-b border-green-800 w-[200px] mx-auto" />
        <img
          src={`${config.apiUrl}storage/${blogData?.image}`}
          alt={blogData?.title}
          className="w-full h-[25rem] object-contain mb-4 mt-4"
        />
        <Typography
          className="w-full text-gray-600 p-4"
          variant="lead"
          dangerouslySetInnerHTML={{ __html: blogData?.content }}
          {...({} as React.ComponentProps<typeof Typography>)}
        ></Typography>
      </section>
      <Footer />
    </>
  );
}
