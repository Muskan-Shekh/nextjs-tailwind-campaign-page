"use client";

import React from "react";
import {
  Button,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import BookCard from "@/components/book-card";

const BOOKS = [
  {
    img: `/image/books/RectangleBig1.svg`,
    category: "Natasha Wing",
    title: "The Night Before Kindergarten",
    desc: "A heartwarming and humorous picture book...",
    price: "$99",
    offPrice: "$79",
    tab: "history",
  },
  {
    img: `/image/books/RectangleBig6.svg`,
    category: "James Patterson",
    title: "Middle School: The Worst Years of My Life",
    desc: "A funny and relatable novel...",
    price: "$99",
    offPrice: "$79",
    tab: "math",
  },
  {
    img: `/image/books/RectangleBig2.svg`,
    category: "Helen W. Colby",
    title: "College Student: A Comprehensive Checklist",
    desc: "A practical guidebook...",
    price: "$99",
    offPrice: "$79",
    tab: "economy",
  },
  {
    img: `/image/books/RectangleBig3.svg`,
    category: "Walter Pauk",
    title: "How to Study in College",
    desc: "A valuable resource...",
    price: "$99",
    offPrice: "$79",
    tab: "law",
  },
  {
    img: `/image/books/RectangleBig4.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book...",
    price: "$99",
    offPrice: "$79",
    tab: "communication",
  },
  {
    img: `/image/books/RectangleBig5.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book...",
    price: "$99",
    offPrice: "$79",
    tab: "business",
  },
  {
    img: `/image/books/RectangleBig1.svg`,
    category: "Natasha Wing",
    title: "The Night Before Kindergarten",
    desc: "A heartwarming and humorous picture book...",
    price: "$99",
    offPrice: "$79",
    tab: "history",
  },
  {
    img: `/image/books/RectangleBig6.svg`,
    category: "James Patterson",
    title: "Middle School: The Worst Years of My Life",
    desc: "A funny and relatable novel...",
    price: "$99",
    offPrice: "$79",
    tab: "math",
  },
  {
    img: `/image/books/RectangleBig2.svg`,
    category: "Helen W. Colby",
    title: "College Student: A Comprehensive Checklist",
    desc: "A practical guidebook...",
    price: "$99",
    offPrice: "$79",
    tab: "economy",
  },
  {
    img: `/image/books/RectangleBig3.svg`,
    category: "Walter Pauk",
    title: "How to Study in College",
    desc: "A valuable resource...",
    price: "$99",
    offPrice: "$79",
    tab: "law",
  },
  {
    img: `/image/books/RectangleBig4.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book...",
    price: "$99",
    offPrice: "$79",
    tab: "communication",
  },
  {
    img: `/image/books/RectangleBig5.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book...",
    price: "$99",
    offPrice: "$79",
    tab: "business",
  },
  {
    img: `/image/books/RectangleBig1.svg`,
    category: "Natasha Wing",
    title: "The Night Before Kindergarten",
    desc: "A heartwarming and humorous picture book...",
    price: "$99",
    offPrice: "$79",
    tab: "history",
  },
  {
    img: `/image/books/RectangleBig6.svg`,
    category: "James Patterson",
    title: "Middle School: The Worst Years of My Life",
    desc: "A funny and relatable novel...",
    price: "$99",
    offPrice: "$79",
    tab: "math",
  },
  {
    img: `/image/books/RectangleBig2.svg`,
    category: "Helen W. Colby",
    title: "College Student: A Comprehensive Checklist",
    desc: "A practical guidebook...",
    price: "$99",
    offPrice: "$79",
    tab: "economy",
  },
  {
    img: `/image/books/RectangleBig3.svg`,
    category: "Walter Pauk",
    title: "How to Study in College",
    desc: "A valuable resource...",
    price: "$99",
    offPrice: "$79",
    tab: "law",
  },
  {
    img: `/image/books/RectangleBig4.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book...",
    price: "$99",
    offPrice: "$79",
    tab: "communication",
  },
  {
    img: `/image/books/RectangleBig5.svg`,
    category: "William Strunk Jr.",
    title: "The Elements of Style",
    desc: "A classic reference book...",
    price: "$99",
    offPrice: "$79",
    tab: "business",
  },
];

const BOOKS_TABS = [
  "history",
  "law",
  "math",
  "economy",
  "business",
  "communication",
];

export function BackToSchoolBooks() {
  const [activeTab, setActiveTab] = React.useState("history");
  const filteredBooks = BOOKS.filter((book) => book.tab === activeTab);
  const shuffledBooks = [...filteredBooks].sort(() => Math.random() - 0.5);

  return (
    <section className="px-8 pt-20">
      <div className="container mx-auto mb-20 text-center">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-3 font-bold uppercase"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          up to 40% OFF
        </Typography>
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-2"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          Back-to-School Books
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-9/12"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          We offer a wide range of study guides, test prep materials, and
          reference books. Whether you&apos;re tackling calculus or diving into
          Shakespeare, we&apos;ve got you covered.
        </Typography>
        <div className="mt-20 flex items-center justify-center">
          <Tabs value={activeTab} className="w-full lg:w-8/12">
            <TabsHeader
              className="h-12 bg-transparent"
              indicatorProps={{
                className: "!bg-gray-900 rounded-lg",
              }}
              {...({} as React.ComponentProps<typeof TabsHeader>)}
            >
              {BOOKS_TABS.map((book) => (
                <Tab
                  key={book}
                  value={book}
                  className={`!font-medium capitalize transition-all duration-300
                    ${activeTab === book ? "text-white" : "capitalize"}
                  `}
                  onClick={() => setActiveTab(book)}
                  {...({} as any)}
                >
                  {book}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
        {/* {BOOKS.map((props, key) => (
          <BookCard key={key} {...props} />
        ))} */}
        {/* {filteredBooks.map((props, key) => (
          <BookCard key={key} {...props} />
        ))} */}
        {shuffledBooks.map((props, key) => (
          <BookCard key={key} {...props} />
        ))}
      </div>
      <div className="grid place-items-center">
        <Button
          className="mt-8"
          variant="outlined"
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Show more
        </Button>
      </div>
    </section>
  );
}

export default BackToSchoolBooks;
