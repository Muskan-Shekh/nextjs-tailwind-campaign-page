"use client";

import { Typography } from "@material-tailwind/react";
import logo from "../../public/logos/logo.png";
import facebook from "../../public/logos/facebook-1-svgrepo-com.svg";
import instagram from "../../public/logos/instagram-1-svgrepo-com.svg";
import youtube from "../../public/logos/youtube-color-svgrepo-com.svg";
import Image from "next/image";

const LINKS = [
  {
    title: "Product",
    items: [
      { label: "About Us", url: "/about-us" },
      { label: "Contact Us", url: "/contact-us" },
      { label: "Privacy Policy", url: "/privacy-policy" },
      { label: "Returns", url: "/returns" },
      { label: "Terms & Conditions", url: "/terms" },
      { label: "Blogs", url: "/blogs" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Vendor Registration", url: "/vendor-registration" },
      { label: "Tuitor", url: "/tuitor" },
      { label: "Join WhatsApp", url: "/join-whatsapp" },
      { label: "Promo Code", url: "/promo-code" },
      { label: "Request Product", url: "/request-product" },
    ],
  },
  {
    title: "Resource",
    items: [
      { label: "Partners", url: "/partners" },
      { label: "Special Thanks", url: "/special-thanks" },
      { label: "Subscription", url: "/subscription" },
      { label: "Enquiry", url: "/enquiry" },
    ],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-4 justify-between gap-4">
          <div>
            <a href="/">
              <Image
                src={logo}
                alt={"book window logo"}
                className="h-[55px] w-[215px]"
              />
            </a>
            <div className="flex px-2 py-2">
              <a href="https://m.facebook.com/100064054598576/" target="_blank">
                <div className="bg-white p-2 border rounded-full shadow-lg hover:bg-orange-100">
                  <Image src={facebook} alt="facebook" className="w-10 h-10" />
                </div>
              </a>
              <a
                href="https://www.instagram.com/bookwindow_2.0?igsh=MXV5ZTVmcTIxcGRyNA=="
                target="_blank"
              >
                <div className="bg-white p-2 border rounded-full ml-2 shadow-lg hover:bg-orange-100">
                  <Image
                    src={instagram}
                    alt="instagram"
                    className="w-10 h-10"
                  />
                </div>
              </a>
              <a href="" target="_blank">
                <div className="bg-white p-2 border rounded-full ml-2 shadow-lg hover:bg-orange-100">
                  <Image src={youtube} alt="youtube" className="w-10 h-10" />
                </div>
              </a>
            </div>
          </div>
          {LINKS.map(({ title, items }) => (
            <ul key={title}>
              {items.map(({ label, url }) => (
                <li key={label}>
                  <Typography
                    as="a"
                    href={url}
                    color="gray"
                    className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                  >
                    {label}
                  </Typography>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </footer>
  );
}
export default Footer;
