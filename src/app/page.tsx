"use client";
// components
import { Navbar, Footer} from "@/components";

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
import { useState } from "react";

export default function Campaign() {
  const [itemsCount, setItemsCount] = useState<number>(0);
  const handleItemsCountUpdate = (count: number) => {
    setItemsCount(count);
  };
  return (
    <>
      <Navbar items_count={itemsCount}/>
      <MainNavbar />
      <Hero />
      <TopBookCategories />
      <BackToSchoolBooks onItemsCountUpdate={handleItemsCountUpdate} />
      {/* <OtherBookOffers /> */}
      <CarouselFeatures />
      <GetYourBookFromUs />
      {/* <Faq /> */}
      {/* <Feature /> */}
      <Footer />
    </>
  );
}
