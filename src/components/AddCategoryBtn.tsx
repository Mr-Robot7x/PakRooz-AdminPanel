"use client";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

function AddCategoryBtn() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/dashboard/categories?addNew=true")}
      size={"icon"}
    >
      <Plus />
    </Button>
  );
}

export default AddCategoryBtn;
