"use client";

import { Navbar, Footer } from "@/components";
import MainNavbar from "@/components/main-navbar";
import BookCard from "@/components/book-card";
import {
  Typography,
  Card,
  ListItem,
  List,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

const OTHER_BOOKS = [
  {
    img: `/image/books/RectangleBig1.svg`,
    category: "33% off",
    title: "Dr. Bhalla - Contemporary Rajasthan by Kuldeep Publication",
    desc: "Dr. L.R Bhalla",
    price: "₹465 ",
    offPrice: "₹696",
  },
  {
    img: `/image/books/RectangleBig7.svg`,
    category: "33% off",
    title: "Utkarsh - Current Affairs Monthly January 2024 By Kumar Gaurav Sir",
    desc: "GAURAV KUMAR",
    price: "₹465 ",
    offPrice: "₹696",
  },
  {
    img: `/image/books/RectangleBig1.svg`,
    category: "33% off",
    title: "SSC Mathematics 7300+ Typewise Question All TCS Pettern Questions",
    desc: "Rakesh Yadav",
    price: "₹465 ",
    offPrice: "₹696",
  },
];

export default function Category() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto mb-10 mt-10 md:flex">
        <div className="col-4 p-4">
          <Card {...({} as React.ComponentProps<typeof Card>)}>
            <Typography
              variant="h6"
              color="white"
              className="text-center bg-black"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              Categories
            </Typography>
            <List {...({} as React.ComponentProps<typeof List>)}>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>Show All</ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                A.C.C
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                AGNIVEER
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                AGRICULTURE OFFICER
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="3"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                Andra Pradesh Competitive Exam
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </List>
          </Card>

          <Card className="mt-4" {...({} as React.ComponentProps<typeof Card>)}>
            <Typography
              variant="h6"
              color="white"
              className="text-center bg-black"
              {...({} as React.ComponentProps<typeof Typography>)}
            >
              Publications
            </Typography>
            <List {...({} as React.ComponentProps<typeof List>)}>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>Show All</ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                A J Publication
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="2"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                Aachman Prakashan (Samyak Institute)
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="3"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                Aadhya Prakshan
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
                Aapno Prakshan
                <ListItemSuffix {...({} as React.ComponentProps<typeof ListItemSuffix>)}>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </List>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 xl:grid-cols-3 col-8 p-4 shadow-lg">
          {OTHER_BOOKS.map((props, key) => (
            <BookCard key={key} {...props} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
