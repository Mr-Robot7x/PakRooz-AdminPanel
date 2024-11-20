import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  DollarSign,
  ListTodo,
  MoreHorizontal,
  Search,
  SwatchBook,
} from "lucide-react";
import laptop from "../../../../../public/webAsserts/product.jpg";
import Image from "next/image";
import ProductForm from "@/components/ProductForm";
import AddProductBtn from "@/components/AddProductBtn";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ addNew: string }>;
}) {
  const addNew = (await searchParams).addNew;

  console.log("Add new :: ", addNew);

  return (
    <Container>
      <h1 className="pt-5">Manage Your Products</h1>
      <div className="w-full mt-8 min-h-screen grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 transition-all">
        <div
          className={`lg:col-span-3 py-4 px-2 col-span-full ${
            addNew ? "order-2 lg:col-span-3" : "order-1 lg:col-span-4"
          }  bg-card border rounded-3xl`}
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
              <AddProductBtn />
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
                  src={laptop}
                  fill
                  quality={60}
                  className="object-cover object-center"
                />
              </div>
              <div className="w-full">
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Ponse Body Lotion For Summer Season Man / Females
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  lotion for men and women in winter for dry skins, newly lunch
                </span>
                <div className="flex justify-start gap-4 text-gray-300">
                  <span className="flex items-center text-sm gap-1">
                    <DollarSign size={16} /> 34
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <ListTodo size={16} /> Cousmetics
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <SwatchBook size={16} /> 7
                  </span>
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
              <div className="w-full">
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Ponse Body Lotion For Summer Season Man / Females
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  lotion for men and women in winter for dry skins, newly lunch
                </span>
                <div className="flex justify-start gap-4 text-gray-300">
                  <span className="flex items-center text-sm gap-1">
                    <DollarSign size={16} /> 34
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <ListTodo size={16} /> Cousmetics
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <SwatchBook size={16} /> 7
                  </span>
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
              <div className="w-full">
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Ponse Body Lotion For Summer Season Man / Females
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  lotion for men and women in winter for dry skins, newly lunch
                </span>
                <div className="flex justify-start gap-4 text-gray-300">
                  <span className="flex items-center text-sm gap-1">
                    <DollarSign size={16} /> 34
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <ListTodo size={16} /> Cousmetics
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <SwatchBook size={16} /> 7
                  </span>
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
              <div className="w-full">
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Ponse Body Lotion For Summer Season Man / Females
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  lotion for men and women in winter for dry skins, newly lunch
                </span>
                <div className="flex justify-start gap-4 text-gray-300">
                  <span className="flex items-center text-sm gap-1">
                    <DollarSign size={16} /> 34
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <ListTodo size={16} /> Cousmetics
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <SwatchBook size={16} /> 7
                  </span>
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
              <div className="w-full">
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Ponse Body Lotion For Summer Season Man / Females
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  lotion for men and women in winter for dry skins, newly lunch
                </span>
                <div className="flex justify-start gap-4 text-gray-300">
                  <span className="flex items-center text-sm gap-1">
                    <DollarSign size={16} /> 34
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <ListTodo size={16} /> Cousmetics
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <SwatchBook size={16} /> 7
                  </span>
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
              <div className="w-full">
                <span className="line-clamp-1 font-semibold text-[15px]">
                  Ponse Body Lotion For Summer Season Man / Females
                </span>
                <span className="text-[12px] text-gray-200 -mt-0.5 line-clamp-1">
                  lotion for men and women in winter for dry skins, newly lunch
                </span>
                <div className="flex justify-start gap-4 text-gray-300">
                  <span className="flex items-center text-sm gap-1">
                    <DollarSign size={16} /> 34
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <ListTodo size={16} /> Cousmetics
                  </span>
                  <span className="flex items-center text-sm gap-1">
                    <SwatchBook size={16} /> 7
                  </span>
                </div>
              </div>
            </div>

            <Button className="mx-auto mt-2" variant={"ghost"}>
              View All Products <ArrowRight />
            </Button>
          </div>
        </div>
        {addNew ? (
          <div
            className={`lg:col-span-4 col-span-full bg-card border ${
              addNew ? "order-1" : "order-2"
            }  rounded-3xl py-3 md:px-4 px-2`}
          >
            <ProductForm />
          </div>
        ) : null}
      </div>
    </Container>
  );
}

export default page;
