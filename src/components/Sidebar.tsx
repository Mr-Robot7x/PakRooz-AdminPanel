"use client";
import React from "react";
import logo from "../../public/webAsserts/logo.png";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ArrowLeftIcon,
  Gift,
  LayoutDashboard,
  ListTree,
  LucideMenu,
  Menu,
  MessageSquareMoreIcon,
  ShoppingCart,
  Tags,
  UserRound,
  Users2,
} from "lucide-react";
import { AdminInfo } from "./AdminInfo";
import { redirect, usePathname } from "next/navigation";
import { useSidebar } from "./SideBarTrigger";
import icon from "../../public/webAsserts/pr-icon.png";
import { useIsMobile } from "@/hooks/use-mobile";
import SearchComponent from "./SearchComponent";
const navItems = [
  {
    name: "DashBoard",
    link: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Orders",
    link: "/orders",
    icon: <Gift />,
  },
  {
    name: "Products",
    link: "/products",
    icon: <ShoppingCart />,
  },
  {
    name: "Offers",
    link: "/offers",
    icon: <Tags />,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: <ListTree />,
  },
  {
    name: "Admins",
    link: "/admins",
    icon: <UserRound />,
  },
  {
    name: "Users",
    link: "/users",
    icon: <Users2 />,
  },
];
function Sidebar() {
  const path = usePathname();
  console.log(path);
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const mobile = useIsMobile();
  console.log("mobile", mobile);

  return (
    <>
      <div
        className={`fixed z-20 w-full top-0 ${
          isSidebarOpen ? "md:pl-[270px]" : "md:pl-[96px]"
        }  bg-white md:px-4 px-2 py-3 flex md:flex-row flex-col-reverse md:items-center items-start md:justify-end md:gap-3 gap-1`}
      >
        <SearchComponent />
        <div className="flex items-center md:justify-center justify-between md:w-max w-full gap-2">
          <Button size={"icon"} className="md:hidden">
            {" "}
            <LucideMenu />{" "}
          </Button>
          <Image
            alt="PakRooz Logo"
            src={logo}
            quality={100}
            loading="eager"
            className="w-36 h-12 object-contain md:hidden inline-block"
          />
          <div className="flex gap-2">
            <Button
              className="rounded-full bg-gradient-to-t from-red-500 to-red-600"
              size={"icon"}
            >
              <MessageSquareMoreIcon className="drop-shadow" />
            </Button>
            <AdminInfo />
          </div>
        </div>
      </div>
      {mobile ? (
        <Menu />
      ) : (
        <aside
          className={`bg-white ${
            isSidebarOpen ? "w-[260px]" : " w-24"
          }  fixed top-0 left-0 h-full p-5  shadow-black/10 transition-all z-30`}
        >
          <div
            onClick={toggleSidebar}
            className={`absolute top-6 cursor-pointer ${
              isSidebarOpen ? "-right-5 w-9 h-9" : "-right-3 w-7 h-7 "
            } drop-shadow-md bg-white items-center justify-center flex rounded-full`}
          >
            <ArrowLeftIcon
              size={20}
              stroke="red"
              className={`${
                isSidebarOpen ? "" : "rotate-180"
              } transition-transform`}
            />
          </div>
          {isSidebarOpen ? (
            <div className="w-52 mx-auto h-14 relative">
              <Image
                alt="PakRooz Logo"
                src={logo}
                quality={100}
                loading="eager"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-12 relative">
              <Image
                alt="PakRooz Logo"
                src={icon}
                quality={100}
                loading="eager"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="w-full mt-6 flex flex-col items-center justify-center gap-y-4">
            {navItems.map((item, i) => (
              <Button
                onClick={() => {
                  redirect(item.link);
                }}
                key={i}
                className={`w-full py-7 items-center ${
                  isSidebarOpen ? " md:pl-10 shadow" : "pl-5 shadow-md"
                }  justify-start flex  hover:text-white ${
                  path.startsWith(item.link)
                    ? "bg-gradient-to-t from-red-500 to-red-600"
                    : "bg-white text-black "
                }`}
                size={"lg"}
              >
                {item.icon}
                {isSidebarOpen && (
                  <span className="font-semibold  tracking-wide">
                    {item.name}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}

export default Sidebar;
