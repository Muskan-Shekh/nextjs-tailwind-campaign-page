"use client";

import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import { Typography, Card, ListItem, List } from "@material-tailwind/react";

export default function Detail() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto mb-10 mt-10 md:flex">
        <div className="grid grid-cols-1 gap-x-6 gap-y-20 col-8 p-4 shadow-lg">
          <Typography
            variant="h2"
            color="black"
            className=""
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Delhi exit polls: Lotus set to bloom again in capital as pollsters
            predict big BJP win. What about Kejriwal AAP
            <Typography
              className="text-gray-800 mt-2"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              7 February, 2025
            </Typography>
            <Typography
              className="text-gray-600 mt-2"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              The results of the Delhi assembly election 2025 will declared on
              Saturday but predictions are still pouring in before the big day.
              Most exit polls have predicted a big victory for the Bharatiya
              Janata Party (BJP) in the national capital.
            </Typography>
          </Typography>
        </div>
        <div className="col-4 p-4">
          <Card {...({} as React.ComponentProps<typeof Card>)}>
            <Typography
              variant="h6"
              color="white"
              className="text-center bg-black"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              others
            </Typography>
            <List {...({} as React.ComponentProps<typeof List>)}>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                इंडिया ने तूफानी अंदाज में जीता पहला वनडे, इंग्लैंड को बुरी तरह
                धोया
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                शुभमन गिल शतक से चूके
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                विश्व दलहन दिवस
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                अंतर्राष्ट्रीय अरबियन तेंदुआ दिवस
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                पेरिस एआई शिखर सम्मेलन की शुरुआत, प्रधानमंत्री मोदी सह-अध्यक्ष
                होंगे
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                राष्ट्रीय नमूना सर्वेक्षण (एनएसएस) की 75वीं वर्षगांठ
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                असम विश्व के सबसे बड़े झुमुर महोत्सव की मेजबानी करेगा
              </ListItem>
            </List>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
}
