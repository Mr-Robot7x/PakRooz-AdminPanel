import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CalendarCheckIcon,
  MoreHorizontal,
  Search,
} from "lucide-react";
import Image from "next/image";

import mobile from "../../../../../public/webAsserts/mobile-image.jpg";
import laptop from "../../../../../public/webAsserts/cat-laptop.jpg";
import CategoryForm from "@/components/CategoryForm";
import AddCategoryBtn from "@/components/AddCategoryBtn";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ addNew: string }>;
}) {
  const addNew = (await searchParams).addNew;

  console.log("Add new :: ", addNew);

  return (
    <Container>
      <h1 className="pt-5">Create & Manage Categories</h1>
      <div className="w-full mt-8 min-h-screen grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 transition-all">
        <div
          className={`lg:col-span-3 ${
            addNew ? "order-2" : "order-1"
          } py-4 px-2 col-span-full bg-card border rounded-3xl`}
        >
          <div className="flex justify-between gap-1 items-center">
            <div className="flex gap-1 items-center">
              <Input
                className="rounded-[50px] md:w-72 w-[70%] md:py-[23px]"
                placeholder="search products.."
              />
              <Button variant={"ghost"} size={"icon"}>
                <Search />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <AddCategoryBtn />

              <Button variant={"secondary"} size={"icon"}>
                <MoreHorizontal />
              </Button>
            </div>
          </div>
          <div className="flex items-start mt-5 justify-start gap-y-4 flex-col">
            <div className="border-b w-full flex gap-3 items-center p-1 transition-colors hover:bg-secondary cursor-pointer rounded-lg">
              <div className="w-16 h-16 bg-secondary rounded-lg relative overflow-hidden ">
                <Image
                  alt="product images"
                  src={mobile}
                  fill
                  quality={60}
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Mobiles
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  All Kind Of Mobiles Are Available in here
                </span>
                <div className="flex text-muted-foreground items-center gap-1 mt-1">
                  <CalendarCheckIcon size={15} />{" "}
                  <span className="text-[12px]">Feb 12, 2022</span>
                </div>
              </div>
            </div>
            <div className="border-b w-full flex gap-3 items-center p-1 transition-colors hover:bg-secondary cursor-pointer rounded-lg">
              <div className="w-16 h-16 bg-secondary rounded-lg relative overflow-hidden ">
                <Image
                  alt="product images"
                  src={laptop}
                  fill
                  quality={60}
                  className="object-cover object-center"
                />
              </div>
              <div>
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Laptops
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  All Brands Laptops for Sell in very cheap prices
                </span>
                <div className="flex text-muted-foreground items-center gap-1 mt-1">
                  <CalendarCheckIcon size={15} />{" "}
                  <span className="text-[12px]">Nov 12, 2021</span>
                </div>
              </div>
            </div>

            <Button className="mx-auto mt-2" variant={"ghost"}>
              View All Categories <ArrowRight />
            </Button>
          </div>
        </div>

        {addNew ? (
          <div
            className={`lg:col-span-4 ${
              addNew ? "order-1" : "order-2"
            } col-span-full bg-card border rounded-3xl py-3 md:px-4 px-2`}
          >
            <CategoryForm />
          </div>
        ) : null}
      </div>
    </Container>
  );
}

export default page;
