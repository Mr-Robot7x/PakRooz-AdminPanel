import React from "react";
import logo from "../../public/webAsserts/logo.png";
import Image from "next/image";
import SearchComponent from "./SearchComponent";
import { AdminInfo } from "./AdminInfo";
import { Button } from "./ui/button";
import TopItems from "./ui/TopItems";
import { Menu } from "lucide-react";
function Navbar() {
  return (
    <header className="fixed z-20 top-0 left-0 w-full py-2 border-b border-secondary dark:bg-black/90 bg-gray-50/90 backdrop-blur  flex items-center justify-between px-2">
      <div className="w-40 h-10 relative">
        <Image
          alt="PakRooz Logo"
          src={logo}
          fill
          className="object-contain drop-shadow-lg saturate-150"
        />
      </div>
      <TopItems />
      <div className="flex gap-2">
        <SearchComponent />
        <AdminInfo />
        <Button className="rounded-full py-5 flex md:hidden" size={"sm"}>
          <Menu />
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
