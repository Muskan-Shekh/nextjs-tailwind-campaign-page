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

export default function CategoryPublicationSidebar({
  categorySlug,
  category_id,
}: any) {
  // console.log("category_id", category_id, categorySlug);
  const [publications, setPublications] = useState([] as any);
  const [categories, setCategories] = useState([] as any);

  useEffect(() => {
    const fetchProductsByCategoryAndPublication = async () => {
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

    fetchProductsByCategoryAndPublication();
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

  useEffect(() => {}, [publications, categories]);

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
        <List
          {...({} as React.ComponentProps<typeof List>)}
          className="h-[30rem] overflow-y-auto"
        >
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
        <List
          {...({} as React.ComponentProps<typeof List>)}
          className="h-[30rem] overflow-y-auto"
        >
          <ListItem {...({} as React.ComponentProps<typeof ListItem>)}>
            <Link href={`category/${categorySlug}`}>Show All</Link>
          </ListItem>
          {publications.map((publication: any) => {
            const filteredCount =
              category_id !== undefined &&
              category_id !== null &&
              category_id !== ""
                ? (publication.products || []).filter(
                    (product: any) =>
                      String(product?.category_id) === String(category_id)
                  ).length
                : 0;

            return (
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
                    // value={publication?.products.length || 0}
                    value={filteredCount || 0}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </div>
  );
}
