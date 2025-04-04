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

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <MainNavbar />
      <section className="container mx-auto mb-10 mt-10 md:flex">
        <div className="col-4 p-4">
          <Card>
            <Typography
              variant="h6"
              color="white"
              className="text-center bg-black"
            >
              Categories
            </Typography>
            <List>
              <ListItem>Show All</ListItem>
              <ListItem>
                A.C.C
                <ListItemSuffix>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                AGNIVEER
                <ListItemSuffix>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                AGRICULTURE OFFICER
                <ListItemSuffix>
                  <Chip
                    value="3"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                Andra Pradesh Competitive Exam
                <ListItemSuffix>
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

          <Card className="mt-4">
            <Typography
              variant="h6"
              color="white"
              className="text-center bg-black"
            >
              Publications
            </Typography>
            <List>
              <ListItem>Show All</ListItem>
              <ListItem>
                A J Publication
                <ListItemSuffix>
                  <Chip
                    value="2"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                Aachman Prakashan (Samyak Institute)
                <ListItemSuffix>
                  <Chip
                    value="3"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                Aadhya Prakshan
                <ListItemSuffix>
                  <Chip
                    value="0"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                Aapno Prakshan
                <ListItemSuffix>
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
