"use client";

import { Typography } from "@material-tailwind/react";
import BookCard from "@/components/book-card";

const OTHER_BOOKS = [
  {
    img: `/image/books/RectangleBig1.svg`,
    category: "33% off",
    title: "Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication",
    desc: "Dr. L.R Bhalla",
    price: "₹465 ",
    offPrice: "₹696",
  },
  {
    img: `/image/books/RectangleBig7.svg`,
    category: "33% off",
    title: "Utkarsh - Current Affairs Monthly January 2024 By Kumar Gaurav Sir",
    desc: "GAURAV KUMAR",
    price: "₹465 ",
    offPrice: "₹696",
  },
  {
    img: `/image/books/RectangleBig1.svg`,
    category: "33% off",
    title: "SSC Mathematics 7300+ Typewise Question All TCS Pettern Questions",
    desc: "Rakesh Yadav",
    price: "₹465 ",
    offPrice: "₹696",
  },
];

export function OtherBookOffers() {
  return (
    <section className="px-8 pt-28 pb-28">
      <div className="container mx-auto mb-10">
        <Typography variant="h2" color="blue-gray" className="mb-2" {...({} as React.ComponentProps<typeof Typography>)}>
          About this product
        </Typography>
        <Typography variant="lead" className="w-full text-gray-600" {...({} as React.ComponentProps<typeof Typography>)}>
          Escape into{" "}
          <strong className="text-gray-700">captivating stories</strong>,
          vibrant characters, and enchanting worlds with our extensive fiction
          collection. A classic reference book on grammar and writing skills,
          essential for high school and college students. A valuable resource
          for high school seniors and college freshmen, offering effective study
          strategies.A classic reference book on grammar and writing skills,
          essential for high school and college students. A{" "}
          <strong className="text-gray-700">valuable resources</strong> for high
          school seniors and college freshmen, offering effective study
          strategies.A classic reference book on grammar and writing skills,
          essential for high school and college students.
        </Typography>
        <Typography variant="lead" className="w-full text-gray-600 mt-2" {...({} as React.ComponentProps<typeof Typography>)}>
          Escape into captivating stories, vibrant characters, and{" "}
          <strong className="text-gray-700">enchanting worlds</strong> with our
          extensive fiction collection. A classic reference book on grammar and
          writing skills, essential for high school and college students.
        </Typography>
        <Typography variant="lead" className="w-full text-gray-600 mt-2" {...({} as React.ComponentProps<typeof Typography>)}>
          Escape into captivating stories, vibrant characters, and{" "}
          <strong className="text-gray-700">enchanting worlds</strong> with our
          extensive fiction collection. A classic reference book on grammar and
          writing skills, essential for high school and college students. A{" "}
          <strong className="text-gray-700">valuable resources</strong> for high
          school seniors and college freshmen, offering effective study
          strategies.A classic reference book on grammar and writing skills,
          essential for high school and college students.
        </Typography>
        <Typography variant="h2" color="blue-gray" className="mt-8" {...({} as React.ComponentProps<typeof Typography>)}>
          Similar Products of This Category
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {OTHER_BOOKS.map((props, key) => (
          <BookCard key={key} {...props} />
        ))}
      </div>
    </section>
  );
}

export default OtherBookOffers;
