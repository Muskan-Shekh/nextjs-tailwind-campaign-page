"use client";

import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";

interface TestimonialCardPropsType {
  img: string;
  client: string;
  title: string;
  clientInfo: string;
}

function CurrentAffairs({
  img,
  client,
  title,
  clientInfo,
}: TestimonialCardPropsType) {
  return (
    <Card shadow={false} className="bg-gray-100/50 rounded-2xl p-6">
      <CardHeader color="transparent" floated={false} shadow={false}>
        <Typography
          as="a"
          color="blue-gray"
          className="lg:mb-20 mb-4 text-2xl font-bold cursor-pointer"
          href="#"
        >
          &quot;{title}&quot;
        </Typography>
      </CardHeader>
      <CardBody className="px-4 py-0 flex flex-wrap-reverse gap-x-6 justify-between items-center">
        <div>
          <Typography variant="h6" color="blue-gray">
            by {client}
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-500"
          >
            {clientInfo}
          </Typography>
        </div>
        {/* <img src={img} className="max-w-[8rem]" alt={client} /> */}
      </CardBody>
    </Card>
  );
}

const testimonials = [
  {
    title: "The education sector can build leaders for tomorrow",
    client: "Shaheen Mistri",
    clientInfo: "Full Stack Developer @Netflix",
    img: "/image/netflix.svg",
  },
  {
    title: "Government vs private schools: What works better?",
    client: "India Development Review ",
    clientInfo: "Graphic Designer, @Coinbase",
    img: "/image/Logo-coinbase.svg",
  },
  {
    title: "Do India’s labour codes address informal workers’ needs?",
    client: "Pankil Goswami ",
    clientInfo: "Full Stack Developer @Netflix",
    img: "/image/netflix.svg",
  },
  {
    title: "Can neighbourhood repair shops help in reducing e-waste?",
    client: "Debojit Dutta, Rakesh Swami, Srishti Gupta",
    clientInfo: "Graphic Designer, @Coinbase",
    img: "/image/Logo-coinbase.svg",
  },
];

export default function CurrentAffairsPage() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="px-8 py-10 lg:py-28">
        <div className="container mx-auto">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-4 !text-2xl lg:!text-4xl"
          >
            Measure twice, pay once
          </Typography>
          <Typography
            variant="lead"
            className="max-w-3xl !text-gray-500 mb-10 lg:mb-20"
          >
            Outcomes-based financing demands more than just tracking data—it
            requires a shift in how nonprofits use monitoring and evaluation to
            drive real impact.
          </Typography>
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            {testimonials.map((props, key) => (
              <CurrentAffairs key={key} {...props} />
            ))}
          </div>

          <Card
            shadow={false}
            className="mt-8 bg-gray-100/50 text-center rounded-2xl p-6"
          >
            <CardHeader color="transparent" floated={false} shadow={false}>
              <Typography
                color="blue-gray"
                className="mb-4 !text-2xl lg:!text-3xl max-w-4xl !leading-snug mx-auto font-bold"
              >
                &quot;&quot;Activists should go to places where laws are made and
                also where laws are implemented. If you don’t get into politics,
                you won’t be able to save the country.&quot;&quot;
              </Typography>
            </CardHeader>
            <CardBody className="items-center mx-auto py-2">
              {/* <img
                src="/image/spotify.svg"
                className="max-w-[8rem] mx-auto grayscale"
                alt="spotify"
              /> */}
              <Typography variant="h6" color="blue-gray">
                by Anushree Parekh, Priyanshi Chauhan, Saumya Lashkari | 6 min
                read
              </Typography>
              <Typography
                variant="paragraph"
                className="font-normal !text-gray-500"
              >
                Chief Executive @Spotify
              </Typography>
            </CardBody>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
}
