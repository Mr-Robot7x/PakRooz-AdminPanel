"use client";

import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
const item = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Admins",
    link: "/admins",
  },
  {
    name: "Settings",
    link: "/setting",
  },
];
function TopItems() {
  const mobile = useIsMobile();
  const path = usePathname();
  if (mobile) {
    return null;
  } else {
    return (
      <div className="flex gap-1">
        {item.map((item, i) => (
          <Link key={i} href={item.link}>
            <Button
              size={"sm"}
              variant={path.includes(item.link) ? "default" : "ghost"}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    );
  }
}

export default TopItems;
