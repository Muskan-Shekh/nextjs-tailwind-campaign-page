"use client";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import logo from "../../public/logos/logo.png";

function Hero() {
  return (
    <header className="bg-yellow-50 px-8">
      <div className="container mx-auto grid h-full min-h-[65vh] w-full grid-cols-1 place-items-center gap-y-10 lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto lg:-mt-6">
          <Typography
            variant="h1"
            color="red"
            className="text-3xl !leading-snug"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            40% OFF
          </Typography>
          <a href="/">
            <Image src={logo} alt={"book window logo"} className="w-[55%]" />
          </a>
          <Typography
            variant="lead"
            className="mb-6 font-normal !text-gray-500 md:pr-16 xl:pr-28"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Ace your exam with our expertly curated selection of competitve exam
            books.
            <br />
            To get all RAS class and books -
          </Typography>
          <Button size="lg" color="gray" {...({} as React.ComponentProps<typeof Button>)}>
            Buy Now
          </Button>
        </div>
        <div className="mt-40 grid gap-6">
          <div className="grid grid-cols-4 gap-6">
            <Image
              width={768}
              height={768}
              src="/image/books/Rectangle8.svg"
              className="rounded-lg shadow-md"
              alt="flowers"
            />
            <Image
              width={768}
              height={768}
              src="/image/books/Rectangle9.svg"
              className="-mt-28 rounded-lg shadow-md"
              alt="flowers"
            />
            <Image
              width={768}
              height={768}
              src="/image/books/Rectangle10.svg"
              className="-mt-14 rounded-lg shadow-md"
              alt="flowers"
            />
            <Image
              width={768}
              height={768}
              src="/image/books/Rectangle11.svg"
              className="-mt-20 rounded-lg shadow-md"
              alt="flowers"
            />
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div></div>
            <Image
              width={768}
              height={768}
              src="/image/books/Rectangle12.svg"
              className="-mt-28 rounded-lg shadow-md"
              alt="flowers"
            />
            <Image
              width={768}
              height={768}
              src="/image/books/Rectangle13.svg"
              className="-mt-14 rounded-lg shadow-md"
              alt="flowers"
            />
            <Image
              width={768}
              height={768}
              src="/image/books/Rectangle14.svg"
              className="-mt-20 rounded-lg shadow-md"
              alt="flowers"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Hero;
