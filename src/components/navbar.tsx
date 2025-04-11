import React, { useState, useRef, useEffect } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import logo from "../../public/logos/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/app/config";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  const [selectedValue, setSelectedValue] = useState<string>(
    "All Publications"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [publications, setPublications] = useState([] as any);

  // Handle dropdown button click
  const handleDropdownButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle option click
  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axios({
          method: "get",
          url: `${config.apiUrl}api/publications`,
          responseType: "json", // Assuming it's a JSON response, since you're calling .json() later
        });
        setPublications(response.data);
      } catch (error) {
        // setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  useEffect(() => {}, [publications]);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("customer");
      localStorage.clear(); // Optional, clears all keys if that's your intent
    }
    router.push("/");
  };

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      className="border-0 sticky top-0 z-50"
      {...({} as React.ComponentProps<typeof MTNavbar>)}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/">
          <Image
            src={logo}
            alt={"book window logo"}
            className="h-[55px] w-[215px]"
          />
        </a>
        <div className="hidden w-full max-w-xl min-w-[200px] lg:block">
          <div className="relative mt-2">
            <div className="absolute top-1 left-1 flex items-center">
              <button
                ref={dropdownButtonRef}
                onClick={handleDropdownButtonClick}
                className="rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-gray-600"
              >
                <span className="text-black overflow-hidden">
                  {selectedValue}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="black"
                  className="h-4 w-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <div className="h-6 border-l border-gray-400 ml-1"></div>
              {isOpen && (
                <div
                  ref={dropdownMenuRef}
                  className="min-w-[150px] overflow-hidden absolute left-0 w-full mt-[32rem] bg-white border border-gray-200 rounded-md shadow-lg"
                >
                  <ul>
                    {/* {[
                      "All Publications",
                      "A J Publications",
                      "Aadhya Publications",
                      "Aapno Publications",
                    ].map((value) => (
                      <li
                        key={value}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm cursor-pointer"
                        onClick={() => handleOptionClick(value)}
                      >
                        {value}
                      </li>
                    ))} */}
                    {publications?.map((publication: any) => (
                      <li
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm cursor-pointer"
                        key={publication?.id}
                        onClick={() => handleOptionClick(publication?.name)}
                      >
                        {publication?.name}
                      </li> // Adjust the field based on the structure of your data
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-gray-600 text-gray-800 text-sm border border-gray-200 rounded-md pr-12 pl-[20rem] py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
              placeholder="Search for products..."
            />
            <button className="absolute right-1 top-1 rounded bg-black p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href={"/add-to-cart"} className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="black"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            <div className="absolute top-[-8px] right-[-8px] bg-red-400 text-white size-4 rounded-full flex justify-center items-center text-[10px]">
              3
            </div>
          </Link>
          {access_token && customer ? (
            <Menu allowHover>
              <MenuHandler>
                <Typography
                  // as="a"
                  // href="/my-account"
                  variant="small"
                  color="blue-gray"
                  className="font-medium flex items-center gap-1 whitespace-nowrap ml-2"
                  {...({} as React.ComponentProps<typeof Typography>)}
                >
                  {JSON.parse(customer).name}
                  <ChevronDownIcon
                    strokeWidth={2}
                    className="h-3 w-3 transition-transform"
                  />
                </Typography>
              </MenuHandler>
              <MenuList {...({} as React.ComponentProps<typeof MenuList>)}>
                <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    onClick={logout}
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              {" "}
              <Button
                variant="text"
                onClick={() => router.push("/sign-in")}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                Log in
              </Button>
              <Button
                variant="text"
                onClick={() => router.push("/registration")}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                Register
              </Button>
            </>
          )}
        </div>

        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
          {...({} as React.ComponentProps<typeof IconButton>)}
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {/* {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))} */}
            {/* <div className="w-full max-w-xl min-w-[200px]">
              <div className="relative mt-2">
                <div className="absolute top-1 left-1 flex items-center">
                  <button
                    ref={dropdownButtonRef}
                    onClick={handleDropdownButtonClick}
                    className="rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-gray-600"
                  >
                    <span className="text-black overflow-hidden">
                      {selectedValue}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="black"
                      className="h-4 w-4 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </button>
                  <div className="h-6 border-l border-gray-400 ml-1"></div>
                  {isOpen && (
                    <div
                      ref={dropdownMenuRef}
                      className="min-w-[150px] overflow-hidden absolute z-60 left-0 w-full mt-[32rem] bg-white border border-gray-200 rounded-md shadow-lg"
                    >
                      <ul>
                        {publications.map((publication: any, index: number) => (
                          <li
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm cursor-pointer"
                            key={index}
                            onClick={() => handleOptionClick(publication.name)}
                          >
                            {publication.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent placeholder:text-gray-600 text-gray-800 text-sm border border-gray-200 rounded-md pr-12 pl-[20rem] py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 hover:border-gray-300 shadow-sm focus:shadow"
                  placeholder="Search for products..."
                />
                <button className="absolute right-1 top-1 rounded bg-black p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-gray-700 focus:shadow-none active:bg-gray-700 hover:bg-gray-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="white"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div> */}
          </ul>
          <div className="mt-6 mb-4 flex items-center gap-2">
            <Link href={"/add-to-cart"} className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <div className="absolute top-[-8px] right-[-8px] bg-red-400 text-white size-4 rounded-full flex justify-center items-center text-[10px]">
                3
              </div>
            </Link>
            <Button
              variant="text"
              onClick={() => router.push("/sign-in")}
              {...({} as React.ComponentProps<typeof Button>)}
            >
              Log in
            </Button>
            <Button
              variant="text"
              onClick={() => router.push("/registration")}
              {...({} as React.ComponentProps<typeof Button>)}
            >
              Register
            </Button>
            {/* <Menu allowHover>
              <MenuHandler>
                <Typography
                  as="a"
                  href="/my-account"
                  variant="small"
                  color="blue-gray"
                  className="font-medium flex items-center gap-1 whitespace-nowrap"
                  {...({} as React.ComponentProps<typeof Typography>)}
                >
                  Muskan
                  <ChevronDownIcon
                    strokeWidth={2}
                    className="h-3 w-3 transition-transform"
                  />
                </Typography>
              </MenuHandler>
              <MenuList {...({} as React.ComponentProps<typeof MenuList>)}>
                <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                    // onClick={closeNav}
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu> */}
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
