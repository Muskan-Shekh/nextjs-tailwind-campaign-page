// components
import { Navbar, Footer} from "@/components";

// sections
import Hero from "./hero";
import TopBookCategories from "./top-book-categories";
import BackToSchoolBooks from "./back-to-school-books";
import OtherBookOffers from "./other-book-offers";
import CarouselFeatures from "./carousel-features";
import GetYourBookFromUs from "./get-your-book-from-us";
import Faq from "./faq";
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
      <OtherBookOffers />
      <CarouselFeatures />
      <GetYourBookFromUs />
      {/* <Faq /> */}
      <Feature />
      <Footer />
    </>
  );
}
