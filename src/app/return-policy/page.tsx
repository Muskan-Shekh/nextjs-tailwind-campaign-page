"use client";
import { Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";

export default function ReturnPolicy() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto px-4 mb-4 mt-10">
        <Typography color="black" variant="h2" className="mb-4">
          Return Policy
        </Typography>
        <Typography className="w-full text-gray-600" variant="lead">
          We are honored by your visit and assure you of our sincere efforts to
          provide best services. We render our services to your acceptance of
          the conditions mentioned below. We request you to please read them
          carefully.
          <br /> <br />
          We are into online selling of books published by leading publications
          of the country. We are not resposible for the content of the books
          provided by respective publishers. Therefore, if a customer had
          recived correct book order by him/ her, request for return of the same
          shall not be entertained.
          <br /> <br />
          If in any case, a wrong book has been erroneously shipped to the
          customer, then only retun will be accepted. In that case it will be
          desirablle that customer ships the books/ books back to us via book
          packet service of India Post.
          <br /> <br />
        </Typography>
        <Typography color="black" variant="h2" className="mb-4">
          Cancellation and Refund Policy
        </Typography>
        <Typography className="w-full text-gray-600" variant="lead">
          An order placed on www.bookwindow.in may be cancelled only before the
          product has been dispatched/shipped. Pending order may be cancelled by
          registered user in his login. Buyers using guest checkout facility
          will not be able to cancel the orders once placed.
          <br /> <br />
          In case an order is cancelled from sellers end due to non-availability
          of books, uncerviciability by courier partner etc, bookwindow will
          request customer for furnishing bank details for the refund.
          <br /> <br />
          Once the cancellation is done, the amount will be fully refunded
          within 10 to 15 working days via original method of payment.
          <br /> <br />
          In case of any exceptional delay in delivery due to any issues with
          India Post/ Courier or refusal to accept delivery by the customer,
          refund could be processed only after receiveing books back to our
          store. No claims for early refund shall be entertained.
          <br /> <br />
        </Typography>
      </section>
      <Footer />
    </>
  );
}
