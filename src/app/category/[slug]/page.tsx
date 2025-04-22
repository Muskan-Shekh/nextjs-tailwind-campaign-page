"use client";

import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import BookCard from "@/components/book-card";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import CategoryPublicationSidebar from "@/components/category-publication-sidebar";
import { useSearchParams } from "next/navigation";

export default function Category({ params }: any) {
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Callback function to receive data from child
  const handleItemsCountUpdate = (count: number) => {
    setItemsCount(count);
  };
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
        (product: any) => product.production_id?.toString() === productionId
      );
      setFilteredProducts(filtered);
      // console.log("filtered", filtered);
    } else {
      // If no production_id, show all products
      setFilteredProducts(products);
    }
  }, [products, productionId]);

  const displayedProducts =
    filteredProducts.length > 0 ? filteredProducts : products;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, products]);

  return (
    <>
      <Navbar items_count={itemsCount} />
      <MainNavbar />
      <section className="container mx-auto mb-10 mt-10 md:flex">
        <CategoryPublicationSidebar
          categorySlug={slug}
          category_id={
            filteredProducts
              ? filteredProducts && filteredProducts[0]?.category_id
              : products[0]?.category_id
          }
        />
        {/* {filteredProducts?.length || products?.length ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3 col-8 p-4 shadow-lg">
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
                    id={product.id}
                    quantity={product.quantity}
                    onItemsCountUpdate={handleItemsCountUpdate}
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
                    id={product.id}
                    quantity={product.quantity}
                    onItemsCountUpdate={handleItemsCountUpdate}
                  />
                ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 shadow-lg w-full p-4 text-center text-6xl font-extrabold">
            No record Found 😔 !
          </div>
        )} */}
        {displayedProducts?.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3 col-8 p-4 shadow-lg">
            {currentItems.map((product: any) => (
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
                onItemsCountUpdate={handleItemsCountUpdate}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 shadow-lg w-full p-4 text-center text-6xl font-extrabold">
            No record Found 😔 !
          </div>
        )}
      </section>
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 items-center space-x-4 shadow-lg pb-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-black"
            }`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-black"
            }`}
          >
            Next
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}
