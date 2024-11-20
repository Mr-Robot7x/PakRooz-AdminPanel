"use client";
import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function AddProductBtn() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/dashboard/products?addNew=true")}
      size={"icon"}
    >
      <PlusIcon />
    </Button>
  );
}

export default AddProductBtn;
