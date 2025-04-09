"use client";
import React from "react";
import {
  Navbar,
  Typography,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import axios from "axios";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import config from "@/app/config";

const MainNavbar: React.FC = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [categories, setCategories] = React.useState([] as any);

  const toggleNav = () => setOpenNav(!openNav);
  const closeNav = () => setOpenNav(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    // console.log("categories", categories);
  }, [categories]);

  return (
    <Navbar
      className="w-full max-w-full backdrop-blur-2xl sticky top-20 z-40 border-0 px-4 py-2"
      {...({} as React.ComponentProps<typeof Navbar>)}
    >
      <div className="grid grid-col-7 text-blue-gray-900 justify-center">
        <div className="hidden gap-2 lg:flex">
          <List
            className="mb-6 mt-4 p-8 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1 gap-14 items-center"
            {...({} as React.ComponentProps<typeof List>)}
          >
            {categories.map((item: any, index: number) => (
              <ListItem
                key={index}
                className="p-1"
                {...({} as React.ComponentProps<typeof ListItem>)}
              >
                {item.child ? (
                  <Menu allowHover>
                    <MenuHandler>
                      <Typography
                        as="a"
                        href={
                          index === 6
                            ? "current-affairs"
                            : `/category/${item.slug}`
                        }
                        variant="small"
                        color="blue-gray"
                        className="font-medium flex items-center gap-1 whitespace-nowrap"
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        {item.name}
                        {[0, 1, 2, 3].includes(index) && (
                          <ChevronDownIcon
                            strokeWidth={2}
                            className="h-3 w-3 transition-transform"
                          />
                        )}
                      </Typography>
                    </MenuHandler>
                    <MenuList
                      {...({} as React.ComponentProps<typeof MenuList>)}
                    >
                      {item.child.map((child: any, childIndex: number) => (
                        <MenuItem
                          key={childIndex}
                          {...({} as React.ComponentProps<typeof MenuItem>)}
                        >
                          <Typography
                            as="a"
                            href={`/category/${child.slug}`}
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                            onClick={closeNav}
                            {...({} as React.ComponentProps<typeof Typography>)}
                          >
                            {child.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                ) : (
                  <Typography
                    as="a"
                    href={`/category/${item.slug}`}
                    variant="small"
                    color="blue-gray"
                    className="font-medium whitespace-nowrap"
                    onClick={closeNav}
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    {item.name}
                  </Typography>
                )}
              </ListItem>
            ))}
          </List>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={toggleNav}
          {...({} as React.ComponentProps<typeof IconButton>)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <List
          className="flex flex-col gap-2 mt-2"
          {...({} as React.ComponentProps<typeof List>)}
        >
          {categories.map((item: any, index: number) => (
            <ListItem
              key={index}
              className="p-1"
              {...({} as React.ComponentProps<typeof ListItem>)}
            >
              {item.child ? (
                <Menu allowHover>
                  <MenuHandler>
                    <Typography
                      as="a"
                      href={
                        index === 6
                          ? "current-affairs"
                          : `/category/${item.slug}`
                      }
                      variant="small"
                      color="blue-gray"
                      className="font-medium flex items-center gap-1"
                      {...({} as React.ComponentProps<typeof Typography>)}
                    >
                      {item.name}
                      {[0, 1, 2, 3].includes(index) && (
                        <ChevronDownIcon
                          strokeWidth={2}
                          className="h-3 w-3 transition-transform"
                        />
                      )}
                    </Typography>
                  </MenuHandler>
                  <MenuList {...({} as React.ComponentProps<typeof MenuList>)}>
                    {item.child.map((child: any, childIndex: number) => (
                      <MenuItem
                        key={childIndex}
                        {...({} as React.ComponentProps<typeof MenuItem>)}
                      >
                        <Typography
                          as="a"
                          href={`/category/${child.slug}`}
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={closeNav} // Close menu on item click
                          {...({} as React.ComponentProps<typeof Typography>)}
                        >
                          {child.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ) : (
                <Typography
                  as="a"
                  href={`/category/${item.slug}`}
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                  onClick={closeNav} // Close menu on item click
                  {...({} as React.ComponentProps<typeof Typography>)}
                >
                  {item.label}
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Navbar>
  );
};

export default MainNavbar;
