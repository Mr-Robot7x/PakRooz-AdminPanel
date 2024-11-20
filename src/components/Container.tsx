"use client";

import {
  Gift,
  LayoutListIcon,
  LucideShoppingBag,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Container({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <section
      id="Main-Content"
      className="flex items-start justify-start mt-[57px]"
    >
      <aside className="md:w-72 hidden md:block dark:bg-black bg-secondary h-full fixed shadow-xl border-r md:pt-6 p-3">
        <Link href={"/dashboard/products"}>
          <div
            className={`flex gap-2 cursor-pointer hover:bg-secondary rounded-lg transition-colors md:px-4 my-4 py-4 px-1 border-b ${
              path.startsWith("/dashboard/products") && "bg-secondary"
            }`}
          >
            <LucideShoppingBag className="text-primary" size={20} />{" "}
            <span className="text-sm">Products</span>
          </div>
        </Link>
        <Link href={"/dashboard/categories"}>
          <div className="flex gap-2 cursor-pointer hover:bg-secondary transition-colors md:px-4 my-4 py-4 px-1 border-b">
            <LayoutListIcon className="text-primary" size={20} />{" "}
            <span className="text-sm">Categories</span>
          </div>
        </Link>
        <div className="flex gap-2 cursor-pointer hover:bg-secondary transition-colors md:px-4 my-4 py-4 px-1 border-b">
          <ShoppingCart className="text-primary" size={20} />{" "}
          <span className="text-sm">Orders</span>
        </div>

        <div className="flex gap-2 cursor-pointer hover:bg-secondary transition-colors md:px-4 my-4 py-4 px-1 border-b">
          <Gift className="text-primary" size={20} />{" "}
          <span className="text-sm">Offers</span>
        </div>
      </aside>
      <section className="flex-grow md:p-4 p-2 overflow-y-auto md:ml-72">
        {children}
      </section>
    </section>
  );
}

export default Container;
