"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Category } from "@/Types/category";
import { CalendarCheckIcon, Search } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import formatDate from "@/lib/formatDate";
import Link from "next/link";

function CategorySearch({ category }: { category: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = React.useState("");
  const [result, setResult] = useState<Category[]>([]);

  React.useEffect(() => {
    setResult([]);

    if (!query) return; // Return all categories if no query is provided
    const filter = category.filter((values) =>
      values.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filter.length !== 0) {
      setResult((prev) => [...prev, ...filter]);
    }
  }, [query]);

  const handleResultClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer hover:bg-secondary px-3 flex items-center justify-center gap-2 rounded-lg transition-colors">
            <Button variant={"ghost"} size={"icon"}>
              <Search />
            </Button>
            <small>search for categories...</small>
          </div>
        </DialogTrigger>
        <DialogContent className="md:w-[450px] w-[95%] min-h-52">
          <DialogHeader>
            <DialogTitle className="text-center">Search Categories</DialogTitle>
            <Input
              className="rounded-[50px] mt-5 w-full md:py-[23px]"
              placeholder="search products.."
              value={query}
              hidden
              onChange={(e) => setQuery(e.target.value)}
            />
          </DialogHeader>

          {result.length !== 0 && (
            <div className="flex flex-col items-start justify-start gap-3">
              {result.map((item) => (
                <Link
                  className="transition-all duration-300 ease-in-out"
                  href={`/dashboard/categories?edit=${item._id}`}
                  key={item._id}
                  onClick={handleResultClick}
                >
                  <div className="border-b w-full flex gap-2 items-center p-1 transition-colors hover:bg-secondary cursor-pointer rounded-lg">
                    <div className="w-16 h-16 bg-secondary rounded-lg relative overflow-hidden ">
                      <Image
                        alt={item.name}
                        src={item.images[0]}
                        fill
                        quality={60}
                        className="object-cover object-center"
                      />
                    </div>
                    <div className=" w-[90%]">
                      <span className="line-clamp-1 font-semibold text-[15px]">
                        {item.name}
                      </span>
                      <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                        {item.description}
                      </span>
                      <div className="flex text-muted-foreground items-center gap-1 mt-1">
                        <CalendarCheckIcon size={15} />{" "}
                        <span className="text-[12px]">
                          {formatDate(item.createdAt.toString())}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CategorySearch;
