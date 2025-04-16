"use client";
import { Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import React from "react";
import config from "../config";
import axios from "axios";

export default function AboutUs() {
  const [aboutUsData, setAboutUsData] = React.useState([] as any);

  React.useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/cms-pages/about-us`,
          responseType: "json",
        });
        setAboutUsData(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchAboutUsData();
  }, []);

  React.useEffect(() => {
    // console.log("aboutUsData", aboutUsData);
  }, [aboutUsData]);

  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto px-4 mb-4 mt-10">
        <Typography
          color="black"
          variant="h2"
          className="mb-4"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {aboutUsData?.title}
        </Typography>
        <Typography
          className="w-full text-gray-600"
          variant="lead"
          dangerouslySetInnerHTML={{ __html: aboutUsData?.content }}
          {...({} as React.ComponentProps<typeof Typography>)}
        ></Typography>
        {/* <Typography
          className="w-full text-gray-600"
          variant="lead"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          <strong className="text-gray-700">&quot;Naresh Bhardwaj&quot;</strong>{" "}
          is the visionary founder of BookWindow, a leading platform in the
          book-selling industry. With a background in Mechanical Engineering
          from JECRC Jaipur, Naresh’s journey began in the village of Bharatpur
          District, Rajasthan, where he was raised in a middle-class family with
          a strong drive for success and learning.
          <br /> <br />
          Naresh&apos;s career is marked by a rich array of experiences across
          various industries. He started his professional path with BookWindow
          as a Business Development Manager, where he first immersed himself in
          the world of books and education. His career then expanded into
          operations with Ishin Fashion in Mumbai, strategic planning with
          Vaibhav Global Ltd. in Jaipur, and leading sales efforts at
          Savindia.com, also in Jaipur. <br /> <br />
          He further honed his skills in Executive General Management at IIIM
          Indore, gaining valuable insights into high-level management and
          strategic execution. This diverse experience has equipped him with a
          unique perspective and a well-rounded skill set, driving his success
          in the business world.
          <br /> <br />
          As the founder of BookWindow, Naresh is committed to bridging gaps in
          education by connecting authors, publishers, and readers. His vision
          is to create a seamless and enriching experience for book enthusiasts
          and students, making quality educational resources accessible to all.{" "}
          <br /> <br />
          <strong className="text-gray-700">Mail id: </strong>
          naresh@bookwindow.in
          <br />
        </Typography> */}
      </section>
      <Footer />
    </>
  );
}
