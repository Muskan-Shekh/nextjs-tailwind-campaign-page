// "use client";

// import BookCard from "@/components/book-card";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../config";

// export default function Category({ params }: any) {
//   const [itemsCount, setItemsCount] = useState<number>(0);
//   const handleItemsCountUpdate = (count: number) => {
//     setItemsCount(count);
//   };

//   const { slug } = params;
//   const [products, setProducts] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const itemsPerPage = 12;

//   useEffect(() => {
//     const fetchProductsByCategory = async () => {
//       try {
//         const response = await axios({
//           method: "get",
//           url: `${config.apiUrl}api/products`,
//           responseType: "json",
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };

//     fetchProductsByCategory();
//   }, [slug]);

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   const goToNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   return (
//     <>
//       <section className="container mx-auto mb-10 mt-10 md:flex flex-col">
//         <div className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3 col-8 p-4 shadow-lg">
//           {currentItems.map((product) => (
//             <BookCard
//               key={product.id}
//               img={`${config.apiUrl}storage/${product.image}`}
//               category={(product?.mrp && product?.price
//                 ? ((product?.mrp - product?.price) / product?.mrp) * 100
//                 : 0
//               ).toFixed(2)}
//               title={product.name}
//               desc={product.description}
//               price={product.mrp}
//               offPrice={product.price}
//               slug={product.slug}
//               id={product.id}
//               quantity={product.quantity}
//               onItemsCountUpdate={handleItemsCountUpdate}
//             />
//           ))}
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex justify-center mt-6 gap-4">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 font-semibold">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </section>
//     </>
//   );
// }
