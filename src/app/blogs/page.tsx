"use client";
import { Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import React from "react";
import config from "../config";
import axios from "axios";

export default function Blogs() {
  const [blogData, setBlogData] = React.useState([] as any);

  React.useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/blog`,
          responseType: "json",
        });
        setBlogData(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchBlogData();
  }, []);

  React.useEffect(() => {
    // console.log("blogData", blogData);
  }, [blogData]);

  const truncateContent = (content:any, limit = 100) => {
    if (!content) return "";
    return content.length > limit ? `${content.slice(0, limit)}...` : content;
  };

  return (
    <>
      <Navbar />
      <MainNavbar />
      <Typography
        color="black"
        variant="h2"
        className="mb-4 text-2xl font-bold text-center mt-4"
        {...({} as React.ComponentProps<typeof Typography>)}
      >
        Blogs
      </Typography>
      <section className="container mx-auto px-4 mb-4 mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {blogData?.map((blog: any) => (
          <div key={blog?.id} className="bg-white p-4 rounded shadow">
            <Typography
              as="a"
              href="#"
              color="black"
              variant="h2"
              className="mb-4 text-xl font-bold"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              {blog?.title}
            </Typography>
            <img
              src={`${config.apiUrl}storage/${blog?.image}`}
              alt={blog?.title}
              className="w-full h-48 object-cover mb-4"
            />
            <Typography
              className="w-full text-gray-600"
              variant="lead"
              dangerouslySetInnerHTML={{ __html: truncateContent(blog?.content) }}
              {...({} as React.ComponentProps<typeof Typography>)}
            ></Typography>
            <a href="#" className="text-gray-800">Read more</a>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}
