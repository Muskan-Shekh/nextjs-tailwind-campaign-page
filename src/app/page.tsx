"use client";
// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "../components/hero";
import TopBookCategories from "../components/top-book-categories";
import BackToSchoolBooks from "../components/back-to-school-books";
import OtherBookOffers from "../components/other-book-offers";
import CarouselFeatures from "../components/carousel-features";
import GetYourBookFromUs from "../components/get-your-book-from-us";
import Faq from "../components/faq";
import MainNavbar from "@/components/main-navbar";
import Feature from "@/components/features";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Campaign() {
  const [itemsCount, setItemsCount] = useState<number>(0);
  const handleItemsCountUpdate = (count: number) => {
    setItemsCount(count);
  };

  const [highlightDiv, setHighlightDiv] = useState(false);
  const divRef: any = useRef(null); // Create a reference to the Div

  const handleButtonClick = () => {
    // Scroll to the Div in the topcategory component
    divRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

    // Highlight the div
    setHighlightDiv(true);

    // Reset the highlight after 3 seconds
    setTimeout(() => setHighlightDiv(false), 2000);
  };

  return (
    <>
      <Navbar items_count={itemsCount} />
      <MainNavbar />
      <motion.div
        // className="footer-content text-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Hero onButtonClick={handleButtonClick} />
      </motion.div>
      <motion.div
        // className="footer-content text-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <TopBookCategories highlightDiv={highlightDiv} divRef={divRef} />
      </motion.div>
      <motion.div
        // className="footer-content text-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <BackToSchoolBooks onItemsCountUpdate={handleItemsCountUpdate} />
      </motion.div>
      {/* <OtherBookOffers /> */}
      <motion.div
        // className="footer-content text-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <CarouselFeatures onButtonClick={handleButtonClick} />
      </motion.div>
      <motion.div
        // className="footer-content text-light"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <GetYourBookFromUs />
      </motion.div>
      {/* <Faq /> */}
      {/* <Feature /> */}
      <Footer />
    </>
  );
}
