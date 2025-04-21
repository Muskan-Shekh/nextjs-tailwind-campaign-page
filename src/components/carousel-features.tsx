"use client";

import Image from "next/image";
import { Typography, Carousel, Button } from "@material-tailwind/react";

export function CarouselFeatures({ onButtonClick }: any) {
  return (
    <div className="px-8 py-32">
      <section className="container mx-auto !rounded-lg bg-[url('https://bookwindow.in/assets/images/_slides/U4ZTD6.webp')] bg-center py-10 lg:px-16 relative">
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <Carousel
          transition={{ duration: 1 }}
          nextArrow={() => <></>}
          prevArrow={() => <></>}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute left-16 bottom-0 z-50 flex h-5 w-20 -translate-x-2/4 gap-2 md:left-2/4">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 w-10 cursor-pointer transition-all content-[''] ${
                    activeIndex === i ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          {...({} as React.ComponentProps<typeof Carousel>)}
        >
          {new Array(2).fill("").map((_, i) => (
            <div
              key={i}
              className="!relative flex grid-cols-1 flex-col-reverse gap-6 px-10 py-14 md:grid md:grid-cols-5  md:gap-14 md:py-20"
            >
              <div className="col-span-3 flex flex-col items-start justify-center">
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-5 text-xl font-normal "
                  {...({} as React.ComponentProps<typeof Typography>)}
                >
                  Ace your exam with our expertly curated selection of
                  competitve exam books.To get all RAS class and books -
                </Typography>
                <div className="flex items-center gap-2">
                  <Button
                    size="lg"
                    color="gray"
                    {...({} as React.ComponentProps<typeof Button>)}
                    onClick={onButtonClick}
                  >
                    🛍️ Buy Now
                  </Button>
                </div>
              </div>
              <div className="col-span-2 flex w-full shrink-0 md:!justify-end">
                <Image
                  width={768}
                  height={768}
                  src="/logos/logo.png"
                  alt="testimonial image"
                  className="h-full w-2/4 object-contain md:!w-2/3"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
}

export default CarouselFeatures;
