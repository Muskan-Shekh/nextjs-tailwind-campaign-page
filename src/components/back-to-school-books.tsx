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
import axios from "axios";
import config from "@/app/config";
import { useRouter } from "next/navigation";

// const BOOKS = [
//   {
//     img: `/image/books/RectangleBig1.svg`,
//     category: "Natasha Wing",
//     title: "The Night Before Kindergarten",
//     desc: "A heartwarming and humorous picture book...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "NCERT",
//   },
//   {
//     img: `/image/books/RectangleBig6.svg`,
//     category: "James Patterson",
//     title: "Middle School: The Worst Years of My Life",
//     desc: "A funny and relatable novel...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "CBSE",
//   },
//   {
//     img: `/image/books/RectangleBig2.svg`,
//     category: "Helen W. Colby",
//     title: "College Student: A Comprehensive Checklist",
//     desc: "A practical guidebook...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "Kids",
//   },
//   {
//     img: `/image/books/RectangleBig3.svg`,
//     category: "Walter Pauk",
//     title: "How to Study in College",
//     desc: "A valuable resource...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "RBSE",
//   },
//   {
//     img: `/image/books/RectangleBig4.svg`,
//     category: "William Strunk Jr.",
//     title: "The Elements of Style",
//     desc: "A classic reference book...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "NCERT",
//   },
//   {
//     img: `/image/books/RectangleBig5.svg`,
//     category: "William Strunk Jr.",
//     title: "The Elements of Style",
//     desc: "A classic reference book...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "Kids",
//   },
//   {
//     img: `/image/books/RectangleBig1.svg`,
//     category: "Natasha Wing",
//     title: "The Night Before Kindergarten",
//     desc: "A heartwarming and humorous picture book...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "NCERT",
//   },
//   {
//     img: `/image/books/RectangleBig6.svg`,
//     category: "James Patterson",
//     title: "Middle School: The Worst Years of My Life",
//     desc: "A funny and relatable novel...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "Kids",
//   },
//   {
//     img: `/image/books/RectangleBig2.svg`,
//     category: "Helen W. Colby",
//     title: "College Student: A Comprehensive Checklist",
//     desc: "A practical guidebook...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "CBSE",
//   },
//   {
//     img: `/image/books/RectangleBig3.svg`,
//     category: "Walter Pauk",
//     title: "How to Study in College",
//     desc: "A valuable resource...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "CBSE",
//   },
//   {
//     img: `/image/books/RectangleBig4.svg`,
//     category: "William Strunk Jr.",
//     title: "The Elements of Style",
//     desc: "A classic reference book...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "RBSE",
//   },
//   {
//     img: `/image/books/RectangleBig5.svg`,
//     category: "William Strunk Jr.",
//     title: "The Elements of Style",
//     desc: "A classic reference book...",
//     price: "$99",
//     offPrice: "$79",
//     tab: "RBSE",
//   },
// ];

// const BOOKS_TABS = [
//   "history",
//   "law",
//   "math",
//   "economy",
//   "business",
//   "communication",
// ];

export function BackToSchoolBooks() {
  const router = useRouter();
  const [category, setCategory] = React.useState([] as any);
  const [products, setProducts] = React.useState([] as any);

  React.useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/category/${"school-books"}`,
          responseType: "json",
        });
        setProducts(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchProductsByCategory();
  }, []);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/category`,
          responseType: "json",
        });
        setCategory(response.data[0]);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchCategories();
  }, []);

  React.useEffect(() => {
    // console.log("products", products);
    // console.log("category", category);
  }, [category, products]);

  const [activeTab, setActiveTab] = React.useState("NCERT");
  // const filteredBooks = BOOKS.filter((book) => book.tab === activeTab);
  const filteredBooks = products?.filter((book: any) => {
    // Find the subcategory with the matching name
    const matchingSubcategory = category?.child?.find(
      (subcategory: any) => subcategory.name === activeTab
    );

    // Compare sub_category_id of the book to the matching subcategory's id
    return book.sub_category_id === matchingSubcategory?.id;
  });

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
          {Array.isArray(category?.child) && category.child.length > 0 && (
            <TabsHeader
              className="h-12 bg-transparent"
              indicatorProps={{
                className: "!bg-gray-900 rounded-lg",
              }}
              {...({} as React.ComponentProps<typeof TabsHeader>)}
            >
              {category?.child?.map((tab: any) => (
                <Tab
                  key={tab.id}
                  value={tab.name}
                  className={`!font-medium capitalize transition-all duration-300 rounded-xl
                    ${
                      activeTab === tab?.name
                        ? "text-white bg-black"
                        : "capitalize"
                    }
                  `}
                  onClick={() => setActiveTab(tab?.name)}
                  {...({} as any)}
                >
                  {tab?.name}
                </Tab>
              ))}
            </TabsHeader>
          )}
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
        {/* {shuffledBooks.map((props, key) => (
          <BookCard key={key} {...props} />
        ))} */}
        {shuffledBooks.map((product: any) => (
          <BookCard
            key={product.id}
            img={`${config.apiUrl}storage/${product.image}`}
            category={(product?.mrp && product?.price
              ? ((product?.mrp - product?.price) / product?.mrp) * 100
              : 0
            ).toFixed(2)}
            title={product.name}
            desc={product.description}
            price={product.mrp}
            offPrice={product.price}
            slug={product.slug}
            id={product.id}
            quantity={product.quantity}
          />
        ))}
      </div>
      <div className="grid place-items-center">
        <Button
          className="mt-8"
          variant="outlined"
          onClick={() => router.push("/category/school-books")}
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Show more
        </Button>
      </div>
    </section>
  );
}

export default BackToSchoolBooks;
