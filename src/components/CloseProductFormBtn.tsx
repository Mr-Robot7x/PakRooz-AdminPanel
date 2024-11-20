"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { X } from "lucide-react";

function CloseProductFormBtn() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/dashboard/products")}
      size={"icon"}
      variant={"ghost"}
    >
      <X />
    </Button>
  );
}

export default CloseProductFormBtn;
