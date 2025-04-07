"use client";

import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const nestedMenuItems = [
  {
    title: "Agriculture Officer",
    url: "/category/agriculture-Officer-books",
  },
  {
    title: "CTET Exam",
    url: "/category/ctet-exam-books",
  },
  {
    title: "EMRC Exam",
    url: "/category/emrc-exam-books",
  },
  {
    title: "NRA CET",
    url: "/category/nra-cet-exam-books",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setopenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const renderItems = nestedMenuItems.map(({ title, url }, key) => (
    <a href={url} key={key}>
      <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>{title}</MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium" {...({} as React.ComponentProps<typeof Typography>)}>
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              {...({} as React.ComponentProps<typeof ListItem>)}
            >
              All Category
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden rounded-xl lg:block" {...({} as React.ComponentProps<typeof MenuList>)}>
          <Menu
            placement="right-start"
            allowHover
            offset={15}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between">
              <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>
                CENTRAL LEVEL COMPETITION EXAMS
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    isMenuOpen ? "rotate-90" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="rounded-xl" {...({} as React.ComponentProps<typeof MenuList>)}>{renderItems}</MenuList>
          </Menu>
          <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>COMMON ENTRANCE EXAMS</MenuItem>
          <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>MEDICAL & NURSING</MenuItem>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between">
              <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>
                Figma
                <ChevronUpIcon
                  strokeWidth={2.5}
                  className={`h-3.5 w-3.5 transition-transform ${
                    isMenuOpen ? "rotate-90" : ""
                  }`}
                />
              </MenuItem>
            </MenuHandler>
            <MenuList className="block rounded-xl lg:hidden" {...({} as React.ComponentProps<typeof MenuList>)}>
              {renderItems}
            </MenuList>
          </Menu>
          <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>React</MenuItem>
          <MenuItem {...({} as React.ComponentProps<typeof MenuItem>)}>TailwindCSS</MenuItem>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1" {...({} as React.ComponentProps<typeof List>)}>
      <Typography
        as="a"
        href="/category/college-books"
        variant="small"
        color="blue-gray"
        className="font-medium"
        {...({} as React.ComponentProps<typeof Typography>)}
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4" {...({} as React.ComponentProps<typeof ListItem>)}>
          College
          <ChevronDownIcon
            strokeWidth={2.5}
            className="hidden h-3 w-3 transition-transform lg:block hover:rotate-180"
          />
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="/category/rajasthan-level-competition-exam-books"
        variant="small"
        color="blue-gray"
        className="font-medium"
        {...({} as React.ComponentProps<typeof Typography>)}
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4" {...({} as React.ComponentProps<typeof ListItem>)}>
          Rajasthan Level Competition Exam
          <ChevronDownIcon
            strokeWidth={2.5}
            className="hidden h-3 w-3 transition-transform lg:block hover:rotate-180"
          />
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="/category/sara-insiparation-novels"
        variant="small"
        color="blue-gray"
        className="font-medium"
        {...({} as React.ComponentProps<typeof Typography>)}
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4" {...({} as React.ComponentProps<typeof ListItem>)}>
          SARA Inspiration
        </ListItem>
      </Typography>
    </List>
  );
}

export function MainNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto w-full max-w-full backdrop-blur-2xl sticky top-20 z-10 border-0 px-4 py-2" {...({} as React.ComponentProps<typeof Navbar>)}>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/category/school-books"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 flex"
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          School
          <ChevronDownIcon
            strokeWidth={2.5}
            className="hidden h-3 w-3 transition-transform lg:block hover:rotate-180 mt-2 ml-2"
          />
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Typography
            as="a"
            href="/category/book@1"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Book@1
          </Typography>
          <Typography
            as="a"
            href="/current-affairs"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Current Affairs
          </Typography>
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
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
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Book@1
          </Typography>
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Current Affairs
          </Typography>
        </div>
      </Collapse>
    </Navbar>
  );
}
export default MainNavbar;
