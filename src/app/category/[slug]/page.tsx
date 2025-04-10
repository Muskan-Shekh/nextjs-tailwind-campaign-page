"use client";

import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import BookCard from "@/components/book-card";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import CategoryPublicationSidebar from "@/components/category-publication-sidebar";
import { useSearchParams } from "next/navigation";

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

export default function Category({ params }: any) {
  const { slug } = params;
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([] as any);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const productionId = searchParams.get("production_id");
  
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/category/${slug}`,
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
  }, [slug]);

  useEffect(() => {
    // console.log("products", products);
  }, [products]);

  useEffect(() => {
    // Filter products if productionId is available
    if (productionId) {
      const filtered = products.filter(
        (product: any) => product.production_id.toString() === productionId
      );
      setFilteredProducts(filtered);
      console.log("filtered", filtered);
    } else {
      // If no production_id, show all products
      setFilteredProducts(products);
    }
  }, [products, productionId]);

  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto mb-10 mt-10 md:flex">
        <CategoryPublicationSidebar categorySlug={slug} />
        <div className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3 col-8 p-4 shadow-lg">
          {/* {OTHER_BOOKS.map((props, key) => (
            <BookCard key={key} {...props} />
          ))} */}
          {filteredProducts && filteredProducts.length > 0
            ? filteredProducts.map((product: any) => (
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
                />
              ))
            : products.map((product: any) => (
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
                />
              ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
