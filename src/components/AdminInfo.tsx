"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, LucideDelete, UserPenIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "next-auth/react";
export function AdminInfo() {
  const { data: User, status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer flex items-center justify-center gap-x-2">
            <div className=" w-10 h-10 bg-gradient-to-t from-red-500 to-red-700 rounded-full flex items-center justify-center relative">
              <span className="absolute w-3 h-3 bg-lime-300 rounded-full bottom-0 right-0"></span>
              <span className="text-lg text-white">{User?.user.name[0]}</span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-72 mr-2">
          <div className="md:hidden block text-center pb-2">
            <span className="font-semibold text-sm line-clamp-1 ">
              {User?.user.name}
            </span>
            <span className="text-[12px]"> {User?.user.email}</span>
          </div>
          <div className="flex justify-center flex-col items-center">
            <Button variant={"ghost"} className="w-11/12">
              <UserPenIcon /> Edit Profile
            </Button>
            <Button
              onClick={() => signOut()}
              variant={"ghost"}
              className="w-11/12"
            >
              <LogOut /> Logout now
            </Button>
            <Button variant={"ghost"} className="w-11/12 text-red-500">
              <LucideDelete /> Delete Account
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
}
