import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaWpforms } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

type NavbarLinkType = {
  url: string;
  text: string;
  icon: React.ReactNode;
};

const links: NavbarLinkType[] = [
  {
    url: "/",
    text: "Home",
    icon: <HiHome className="fill-fuchsia-500" />,
  },
  {
    url: "category",
    text: "Category",
    icon: <MdCategory className="fill-fuchsia-500" />,
  },
  {
    url: "/contact",
    text: "Contact",
    icon: <FaWpforms className="fill-fuchsia-500" />,
  },
];

export const LinkComponent = () => {
  return (
    <ul className="md:flex gap-11 hidden">
      {links.map((link, id) => {
        return (
          <li key={id}>
            <Link to={link.url} className="flex items-center">
              <span className="text-3xl mr-3">{link.icon}</span>
              <h5 className="font-semibold">{link.text}</h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
