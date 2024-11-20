// import Container from "@/components/Container";

import Container from "@/components/Container";
import { Component } from "@/components/DataChart";
import { WeeklyChart } from "@/components/WeeklyChart";
import {
  BadgeDollarSign,
  CalendarRangeIcon,
  CircleDollarSign,
  Delete,
  Edit,
  LucideShoppingCart,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";
import laptop from "../../../../public/webAsserts/laptop-image.jpg";
// import ImageUpload from "@/components/FileUpload";
function MainDashboard() {
  return (
    <Container>
      <div className="pt-5">
        <h1>Hi, Welcome Back ✨</h1>

        <div className="mt-8 w-full flex relative flex-wrap justify-between gap-4 py-5">
          <div className="h-32 flex flex-col gap-1 items-start justify-center p-4 relative lg:basis-[23%] md:basis-[40%] basis-full bg-card rounded-3xl border">
            <BadgeDollarSign className="absolute top-4 right-4 text-secondary" />
            <span className="text-sm">Total Revenue</span>
            <span className="font-bold text-primary text-2xl">$13959.53</span>
            <span className="text-[12px]">
              <span className="text-green-600">+20%</span> from last month
            </span>
          </div>
          <div className="h-32 flex flex-col gap-1 items-start justify-center p-4 relative lg:basis-[23%] md:basis-[40%] basis-full bg-card rounded-3xl border">
            <CalendarRangeIcon className="absolute top-4 right-4 text-secondary" />
            <span className="text-sm">This Week</span>
            <span className="font-bold text-primary text-2xl">$139</span>
            <span className="text-[12px]">
              <span className="text-destructive">+10%</span> lower from last
              week
            </span>
          </div>
          <div className="h-32 flex flex-col gap-1 items-start justify-center p-4 relative lg:basis-[23%] md:basis-[40%] basis-full bg-card rounded-3xl border">
            <LucideShoppingCart className="absolute top-4 right-4 text-secondary" />
            <span className="text-sm">Total Orders</span>
            <span className="font-bold text-primary text-2xl">14543</span>
            <span className="text-[12px]">
              <span className="text-green-600">+179</span> from last month
            </span>
          </div>

          <div className="h-32 flex flex-col gap-1 items-start justify-center p-4 relative lg:basis-[23%] md:basis-[40%] basis-full bg-card rounded-3xl border">
            <Users2Icon className="absolute top-4 right-4 text-secondary" />
            <span className="text-sm">Total Users</span>
            <span className="font-bold text-primary text-2xl">786</span>
            <span className="text-[12px]">
              <span className="text-green-600">+30</span> in this week
            </span>
          </div>
        </div>

        {/* second */}

        <div className="mt-8 w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 border p-5 rounded-3xl bg-card">
            <Component />
          </div>
          <div className="md:col-span-3 p-3 border rounded-3xl col-span-4 min-h-43 bg-card">
            <h2>Recently Orders</h2>
            <div className="mt-4 flex hover:bg-accent transition-colors py-2 px-1 rounded-xl cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 flex items-center justify-center h-10 bg-secondary rounded-full">
                  <span className="drop-shadow">AH</span>
                </div>
                <div className="text-sm">
                  <span className="line-clamp-1 pl-1">
                    HP Core i3 Laptop 11th Generation 11th Generation
                  </span>
                  <span className="text-sm text-muted-foreground mt-0.5">
                    from: Ahmad Hussain
                  </span>
                </div>
              </div>
              <span className="font-semibold text-xl">$19</span>
            </div>
            <div className="mt-4 flex hover:bg-accent transition-colors py-2 px-1 rounded-xl cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 flex items-center justify-center h-10 bg-secondary rounded-full">
                  <span className="drop-shadow">AH</span>
                </div>
                <div className="text-sm">
                  <span className="line-clamp-1 pl-1">
                    HP Core i3 Laptop 11th Generation 11th Generation
                  </span>
                  <span className="text-sm text-muted-foreground mt-0.5">
                    from: Ahmad Hussain
                  </span>
                </div>
              </div>
              <span className="font-semibold text-xl">$139</span>
            </div>
            <div className="mt-4 flex hover:bg-accent transition-colors py-2 px-1 rounded-xl cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 flex items-center justify-center h-10 bg-secondary rounded-full">
                  <span className="drop-shadow">MK</span>
                </div>
                <div className="text-sm">
                  <span className="line-clamp-1 pl-1">
                    Realtek Headphone 2300K Hz New Condition
                  </span>
                  <span className="text-sm text-muted-foreground mt-0.5">
                    from: Muneeb khan
                  </span>
                </div>
              </div>
              <span className="font-semibold text-xl">$139</span>
            </div>
            <div className="mt-4 flex hover:bg-accent transition-colors py-2 px-1 rounded-xl cursor-pointer items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 flex items-center justify-center h-10 bg-secondary rounded-full">
                  <span className="drop-shadow">UK</span>
                </div>
                <div className="text-sm">
                  <span className="line-clamp-1 pl-1">
                    I Phone XR Second Hand
                  </span>
                  <span className="text-sm text-muted-foreground mt-0.5">
                    from: Umar khan
                  </span>
                </div>
              </div>
              <span className="font-semibold text-xl">$139</span>
            </div>
          </div>
        </div>

        {/* third */}

        <div className="mt-8 w-full border bg-card md:p-5 p-3 rounded-3xl">
          <h2 className="pb-4">This Week Sales</h2>
          <WeeklyChart />
        </div>

        {/* {third} */}

        <div className="mt-8 w-full min-h-52 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 md:px-0 px-5">
          <h2 className="col-span-4">Recantly Addred Products</h2>
          <div className="bg-card border rounded-2xl p-2">
            <div className="w-full h-36 rounded-2xl bg-secondary overflow-hidden mx-auto relative">
              <Image
                alt="product image"
                src={laptop}
                fill
                className="object-cover object-center"
              />
            </div>
            <span className="text-sm line-clamp-2 mt-3">
              HP Core i3 11th Genation 500GB hardisk
            </span>
            <div className="flex items-center pb-2 border-b justify-between">
              <div className="text-primary mt-1.5 flex gap-2">
                <CircleDollarSign />{" "}
                <span className="text-base font-semibold">34.6</span>
              </div>
              <div className="flex gap-2">
                <Edit className="cursor-pointer" />
                <Delete className="text-destructive cursor-pointer" />
              </div>
            </div>
            <span className="text-[12px] text-gray-400">
              Added By: Mashal Horara
            </span>
          </div>
          <div className="bg-card border rounded-2xl p-2">
            <div className="w-full h-36 rounded-2xl bg-secondary overflow-hidden mx-auto relative">
              <Image
                alt="product image"
                src={laptop}
                fill
                className="object-cover object-center"
              />
            </div>
            <span className="text-sm line-clamp-2 mt-3">
              HP Core i3 11th Genation 500GB hardisk
            </span>
            <div className="flex items-center pb-2 border-b justify-between">
              <div className="text-primary mt-1.5 flex gap-2">
                <CircleDollarSign />{" "}
                <span className="text-base font-semibold">34.6</span>
              </div>
              <div className="flex gap-2">
                <Edit className="cursor-pointer" />
                <Delete className="text-destructive cursor-pointer" />
              </div>
            </div>
            <span className="text-[12px] text-gray-400">
              Added By: Mashal Horara
            </span>
          </div>
          <div className="bg-card border rounded-2xl p-2">
            <div className="w-full h-36 rounded-2xl bg-secondary overflow-hidden mx-auto relative">
              <Image
                alt="product image"
                src={laptop}
                fill
                className="object-cover object-center"
              />
            </div>
            <span className="text-sm line-clamp-2 mt-3">
              HP Core i3 11th Genation 500GB hardisk
            </span>
            <div className="flex items-center pb-2 border-b justify-between">
              <div className="text-primary mt-1.5 flex gap-2">
                <CircleDollarSign />{" "}
                <span className="text-base font-semibold">34.6</span>
              </div>
              <div className="flex gap-2">
                <Edit className="cursor-pointer" />
                <Delete className="text-destructive cursor-pointer" />
              </div>
            </div>
            <span className="text-[12px] text-gray-400">
              Added By: Mashal Horara
            </span>
          </div>
          <div className="bg-card border rounded-2xl p-2">
            <div className="w-full h-36 rounded-2xl bg-secondary overflow-hidden mx-auto relative">
              <Image
                alt="product image"
                src={laptop}
                fill
                className="object-cover object-center"
              />
            </div>
            <span className="text-sm line-clamp-2 mt-3">
              HP Core i3 11th Genation 500GB hardisk
            </span>
            <div className="flex items-center pb-2 border-b justify-between">
              <div className="text-primary mt-1.5 flex gap-2">
                <CircleDollarSign />{" "}
                <span className="text-base font-semibold">34.6</span>
              </div>
              <div className="flex gap-2">
                <Edit className="cursor-pointer" />
                <Delete className="text-destructive cursor-pointer" />
              </div>
            </div>
            <span className="text-[12px] text-gray-400">
              Added By: Mashal Horara
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MainDashboard;
