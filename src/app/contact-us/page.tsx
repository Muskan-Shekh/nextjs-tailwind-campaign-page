"use client";

import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";

export function ContactSection14() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="px-8 py-8 lg:py-16">
        <div className="container mx-auto text-center">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-4 !text-base lg:!text-2xl"
          >
            Contact Us
          </Typography>
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 !text-3xl lg:!text-5xl"
          >
            Our Location
          </Typography>
          <div className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-3 items-start">
            <div className="">
              <strong className="text-gray-700">Bookwindow: </strong> <br />
              Shop No. 8, Maharani Garden road near by Hotel Dwarika Palace,
              Mangyawas, Jaipur, 302020, Rajasthan
            </div>
            <div className="">
              <strong className="text-gray-700">Mobile: </strong> <br />
              +91 96023 68227
            </div>
            <div className="">
              <strong className="text-gray-700">Email: </strong>
              <br />
              info@bookwindow.in
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d649.1622899692323!2d75.78353552039037!3d26.872709862147758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5759aa54889%3A0x63b0e198923e4670!2sRajesh%20Ramsinghani!5e1!3m2!1sen!2sbd!4v1726603072398!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <form action="#" className="flex flex-col gap-4 lg:max-w-sm">
              <Typography
                variant="small"
                className="text-left !font-semibold !text-gray-600"
              >
                Contact Form
              </Typography>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900"
                  >
                    First Name
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="First Name"
                    name="first-name"
                    className="focus:border-t-gray-900"
                    containerProps={{
                      className: "min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900"
                  >
                    Last Name
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="Last Name"
                    name="last-name"
                    className="focus:border-t-gray-900"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Your Email
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="name@email.com"
                  name="email"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Subject
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="Enter subject"
                  name="subject"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-gray-900"
                >
                  Your Message
                </Typography>
                <Textarea
                  rows={6}
                  color="gray"
                  placeholder="Message"
                  name="message"
                  className="focus:border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <Button className="w-full" color="gray">
                Send message
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ContactSection14;
