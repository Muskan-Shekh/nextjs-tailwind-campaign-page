"use client";
import { Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";

export default function Terms() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto px-4 mb-4 mt-10">
        <Typography color="black" variant="h2" className="mb-4">
          Terms and Conditions
        </Typography>
        <Typography className="w-full text-gray-600" variant="lead">
          We are honored by your visit and assure you of our sincere efforts to
          provide best services. We render our services to your acceptance of
          the conditions mentioned below. We request you to please read them
          carefully. If you visit and/or use the services offered by
          www.bookwindow.in it is taken that you understand and accept the
          conditions set hereunder.
          <br /> <br />
        </Typography>
        <ul>
          <li>
            1. The contents of this site, www.bookwindow.in are electronically
            generated. All our communication with you would be in electronic
            form either by e-mails or by posting notices and messages on the
            website. And you agree to receive and accept all communication
            related to services offered by www.bookwindow.in.
          </li>
          <li>
            2. You can visit and make personal use of this site and services.
            However, you are restricted from downloading or modifying any
            portion of the website including images. This site or any portion of
            this site may not be reproduced, duplicated, copied, sold, resold,
            visited, or otherwise exploited for any commercial purpose without
            express written consent of www.bookwindow.in.
          </li>
          <li>
            3. You agree to provide a valid e-mail address and create an account
            with password at www.bookwindow.in in order to take services from
            www.bookwindow.in. You are also responsible for maintaining your
            account and protect account password and for restricting access to
            your computer, and agree to accept responsibility for all activities
            that occur under your account or password.
          </li>
        </ul>
        <Typography color="black" variant="h2" className="mb-4">
          Cancellation and Refund Policy
        </Typography>
        <Typography className="w-full text-gray-600" variant="lead">
          An order placed on www.bookwindow.in may be cancelled only before the
          product has been dispatched/shipped. Pending order may be cancelled by
          registered user in his login. Buyers using guest checkout facility
          will not be able to cancel the orders once placed. Once the
          cancellation is done, the amount will be fully refunded within 10 to
          15 working days via original method of payment .
          <br /> <br />
          In case of any exceptional delay in delivery due to any issues with
          India Post/ Courier or refusal to accept delivery by the customer,
          refund could be processed only after receiveing books back to our
          store. No claims for early refund shall be entertained.
          <br /> <br />
        </Typography>
        <Typography color="black" variant="h2" className="mb-4">
          Disputes
        </Typography>
        <Typography className="w-full text-gray-600" variant="lead">
          Any dispute or claim relating in any way to your visit to
          www.bookwindow.in or to products you purchase through
          www.bookwindow.in only be in the jurisdiction of the Courts of Jaipur.
          Arbitration under this agreement shall be conducted under the rules
          and prevailing Laws. The arbitrator's award shall be binding and may
          be entered as a judgment in any court of competent jurisdiction. To
          the fullest extent permitted by applicable law, no arbitration under
          this Agreement shall be joined to an arbitration involving any other
          party subject to this Agreement, whether through class arbitration
          proceedings or otherwise.
          <br /> <br />
        </Typography>
        <Typography color="black" variant="h2" className="mb-4">
          Applicable Law
        </Typography>
        <Typography className="w-full text-gray-600" variant="lead">
          By visiting www.bookwindow.in, you agree that the laws of INDIA,
          without regard to principles of conflict of laws, will govern these
          Conditions of Use and any dispute of any sort that might arise between
          you and www.bookwindow.in.
          <br /> <br />
        </Typography>
        <Typography color="black" variant="h2" className="mb-4">
          Site Policies
        </Typography>
        <Typography className="w-full text-gray-600" variant="lead">
          We reserve the right to make changes to our site policies, and these
          Terms and Conditions of Use at any time. If any of these conditions
          shall be deemed invalid, void, or for any reason unenforceable, that
          condition shall be deemed severable and shall not affect the validity
          and enforceability of any remaining condition.
          <br /> <br />
        </Typography>
      </section>
      <Footer />
    </>
  );
}
