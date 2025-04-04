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

export default function Campaign() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <Hero />
      <TopBookCategories />
      <BackToSchoolBooks />
      {/* <OtherBookOffers /> */}
      <CarouselFeatures />
      <GetYourBookFromUs />
      {/* <Faq /> */}
      <Feature />
      <Footer />
    </>
  );
}
