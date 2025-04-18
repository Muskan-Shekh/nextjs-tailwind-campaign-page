"use client";
import { Typography } from "@material-tailwind/react";
import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import React from "react";
import axios from "axios";
import config from "../config";

export default function PrivacyPolicy() {
  const [privacyPolicyData, setPrivacyPolicyData] = React.useState([] as any);

  React.useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/cms-pages/privacy-policy`,
          responseType: "json",
        });
        setPrivacyPolicyData(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchPrivacyPolicy();
  }, []);

  React.useEffect(() => {
    // console.log("privacyPolicyData", privacyPolicyData);
  }, [privacyPolicyData]);

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
          {privacyPolicyData?.title}
        </Typography>
        <Typography
          className="w-full text-gray-600"
          variant="lead"
          dangerouslySetInnerHTML={{ __html: privacyPolicyData?.content }}
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          {/* <div
      dangerouslySetInnerHTML={{ __html: privacyPolicyData?.content}}
    /> */}
        </Typography>
        {/* <Typography className="w-full text-gray-600" variant="lead" {...({} as React.ComponentProps<typeof Typography>)}>
          This policy covers how BOOKWINDOW treats personal information that
          BOOKWINDOW collects and receives, including information about you that
          is personally identifiable but is not otherwise publicly available.
          <br /> <br />
          BOOKWINDOW collects personal information when you register with
          BOOKWINDOW, when you useBOOKWINDOW products or services or when you
          visit BOOKWINDOW pages or otherwise, which information may include but
          is not limited to, your name, address, email address, phone number,
          birth date, gender, zip /pin code, occupation, industry, employment
          resumes, career profiles, etc., and other such information about you
          which is not otherwise publicly available. Besides, BOOKWINDOW
          automatically receives and records information on our server logs from
          your browser, including your IP address, the page you request, etc.{" "}
          <br /> <br />
          BOOKWINDOW uses the above information for the following general
          purposes: to customise the advertising and content you see on the site
          or through personal emails, fulfill your requests for products and
          services, improve our services, contact you, conduct research, or send
          emails containing advertisements / newsletters / notifications suomotu
          or on behalf of external clients.
          <br /> <br />
          BOOKWINDOW does not provide any personal information to the advertiser
          when you view a targeted ad either on the site or in your email inbox.
          However, by interacting with the advertiser, you are consenting to the
          possibility that the advertiser will make the assumption that you meet
          the targeting criteria and the advertiser may, therefore, contact you
          based on the data gathered by him, solely consequent to your
          interactions with him, for which BOOKWINDOW assumes no responsibility,
          whatsoever.
          <br /> <br />
          BOOKWINDOW advertisers may include educational institutions, private
          coaching institutes, teachers, book sellers / stores, publishers,
          authors, software companies and other Companies, which may have
          potential business interest in the targeted members / visitors of
          BOOKWINDOW.
          <br /> <br />
          BOOKWINDOW does not rent, sell, or share personal information about
          you with third parties, except when specifically informed to you at
          the time of collection of the information and / or to provide products
          or services you&apos;ve requested, when we have your permission, or under
          the following circumstances: We provide the information to trusted
          partners who work on behalf of or with BOOKWINDOW under
          confidentiality agreements for the purpose of creating / modifying /
          maintaining the site. However, these companies do not have any
          independent right to share / use this information for any other
          purpose, except for that specifically authorised by BOOKWINDOW.
          <br /> <br />
          We respond to court orders, or legal process, or to establish or
          exercise our legal rights or defend against legal claims; We believe
          it is necessary to share information in order to investigate, prevent,
          or take action regarding illegal activities, suspected fraud,
          situations involving potential threats to the physical safety of any
          person, violations of BOOKWINDOW terms of use, or as otherwise
          required by law.
          <br /> <br />
        </Typography> */}
      </section>
      <Footer />
    </>
  );
}
