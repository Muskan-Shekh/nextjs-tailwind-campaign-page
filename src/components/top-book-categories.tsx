"use client";

import React from "react";
import CategoryCard from "@/components/category-card";
import { motion } from "framer-motion";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  GlobeEuropeAfricaIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

// const CATEGORIES = [
//   {
//     cat_image: "/image/blogs/blog-3.png",
//     cat_icon: HeartIcon,
//     cat_title: "Fiction Books",
//     cat_content: "up to 40% OFF",
//   },
  // {
  //   img: "/image/blogs/blog-12.jpeg",
  //   icon: PuzzlePieceIcon,
  //   title: "School Books",
  //   desc: "up to 40% OFF",
  // },
  // {
  //   img: "/image/blogs/blog-10.jpeg",
  //   icon: GlobeEuropeAfricaIcon,
  //   title: "Non-fiction Books",
  //   desc: "up to 40% OFF",
  // },
  // {
  //   img: "/image/blogs/blog-13.png",
  //   icon: MicrophoneIcon,
  //   title: "SF & Fantasy Books",
  //   desc: "up to 40% OFF",
  // },
// ];

export function TopBookCategories({
  highlightDiv,
  divRef,
  category_section,
}: any) {
  const sellingContent = category_section?.category_sections[0];
  return (
    <section
      ref={divRef}
      className={`container mx-auto px-8 pb-20 pt-20 lg:pt-0 ${
        highlightDiv ? "bg-gray-300 shadow-2xl p-4" : ""
      }`}
    >
      <div className="mb-20 grid place-items-center text-center pt-20">
        <Typography
          variant="h2"
          color="blue-gray"
          className="my-3"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {/* Top Book Categories  */}
          {category_section?.cat_sec_title}
        </Typography>
        <Typography
          variant="lead"
          className="!text-gray-500 lg:w-6/12"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {/* Explore our diverse range of categories and embark on a reading
          journey that suits your mood, passion, or curiosity. */}
          {category_section?.cat_sec_description}
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          color="gray"
          className="relative grid h-full w-full place-items-center overflow-hidden text-center"
          {...({} as React.ComponentProps<typeof Card>)}
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <CardBody
              className="relative w-full"
              {...({} as React.ComponentProps<typeof CardBody>)}
            >
              <Typography
                color="white"
                className="text-xs font-bold opacity-50 hover:opacity-100"
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                up to 40% OFF
              </Typography>
              <Typography
                variant="h4"
                className="mt-9"
                color="white"
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                {/* Bestselling Books */}
                {sellingContent?.cat_title}
              </Typography>
              <Typography
                color="white"
                className="mt-4 mb-14 font-normal opacity-50 hover:opacity-100"
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                {/* Explore our extensive collection of textbooks, workbooks,
                novels, and more. From preschool to post-grad, we have books for
                every age and academic level. */}
                {sellingContent?.cat_content}
              </Typography>
              <Button
                size="sm"
                color="white"
                {...({} as React.ComponentProps<typeof Button>)}
              >
                {/* Read More */}
                {sellingContent?.cat_button_title}
              </Button>
            </CardBody>
          </motion.div>
        </Card>
        <div className="col-span-1 flex flex-col gap-6">
          {/* {CATEGORIES.slice(0, 2).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))} */}
          {category_section?.category_sections
            ?.slice(1, 3)
            .map((data: any, index: number) => (
              <CategoryCard
                key={data?.id}
                cat_image={data.cat_image}
                cat_title={data.cat_title}
                cat_content={data.cat_content}
                cat_icon={data.cat_icon}
              />
            ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {/* {CATEGORIES.slice(2, 4).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))} */}
          {category_section?.category_sections
            ?.slice(3, 5)
            .map((data: any, index: number) => (
              <CategoryCard
                key={data?.id}
                cat_image={data.cat_image}
                cat_title={data.cat_title}
                cat_content={data.cat_content}
                cat_icon={data.cat_icon}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TopBookCategories;
