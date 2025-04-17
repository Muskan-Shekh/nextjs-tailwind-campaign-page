"use client";

import config from "@/app/config";
import {
  Typography,
  Card,
  ListItem,
  List,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryPublicationSidebar({ categorySlug }: any) {
  const [publications, setPublications] = useState([] as any);
  const [categories, setCategories] = useState([] as any);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/publications`,
          responseType: "json",
        });
        setPublications(response.data?.data?.production);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchProductsByCategory();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/category`,
          responseType: "json",
        });
        setCategories(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        // console.log("An error occured");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // console.log("categories", categories); 
  }, [publications, categories]);

  return (
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
        <List {...({} as React.ComponentProps<typeof List>)} className="h-[30rem] overflow-y-auto">
          <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
            Show All
          </ListItem>
          {categories.map((category: any) => (
            <div key={category?.id}>
              {category?.child?.map((chidCategory: any) => (
                <ListItem
                  {...({} as React.ComponentProps<typeof ListItem>)}
                  key={chidCategory?.id}
                >
                  <Link href={`category/${chidCategory?.slug}`}>
                    {" "}
                    {chidCategory.name}
                  </Link>
                  <ListItemSuffix
                    {...({} as React.ComponentProps<typeof ListItemSuffix>)}
                  >
                    <Chip
                      value="0"
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
              ))}
            </div>
          ))}
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
        <List {...({} as React.ComponentProps<typeof List>)} className="h-[30rem] overflow-y-auto">
          <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
            <Link href={`category/${categorySlug}`}>Show All</Link>
          </ListItem>
          {publications.map((publication: any) => (
            <ListItem
              {...({} as React.ComponentProps<typeof ListItem>)}
              key={publication?.id}
            >
              <Link
                href={`category/${categorySlug}?production_id=${publication?.id}`}
              >
                {publication?.name}
              </Link>
              <ListItemSuffix
                {...({} as React.ComponentProps<typeof ListItemSuffix>)}
              >
                <Chip
                  value={publication?.products.length || 0}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
