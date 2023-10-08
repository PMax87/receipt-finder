import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaWpforms } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import useHomePage from "../hooks/useHomePage";

type NavbarLinkType = {
  url: string;
  text: string;
  icon: React.ReactNode;
};

type NavbarClassName = {
  classlink: string;
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

export const LinkComponent = ({ classlink }: NavbarClassName) => {
  const { HOMEPAGE_REDUCER_ACTIONS, dispatch } = useHomePage();

  const onCloseSidebar = () => {
    dispatch({ type: HOMEPAGE_REDUCER_ACTIONS.CLOSE_SIDEBAR });
  };

  return (
    <ul
      className={
        classlink === "navbar"
          ? "flex gap-11"
          : "h-full grid justify-center gap-12 content-center"
      }
    >
      {links.map((link, id) => {
        return (
          <li key={id}>
            <Link
              to={link.url}
              className="flex items-center"
              onClick={onCloseSidebar}
            >
              <span className="text-3xl mr-3">{link.icon}</span>
              <h5
                className={
                  classlink === "navbar" ? "font-semibold" : "text-3xl"
                }
              >
                {link.text}
              </h5>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
