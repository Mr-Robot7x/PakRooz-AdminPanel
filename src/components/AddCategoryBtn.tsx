"use client";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

function AddCategoryBtn({ btn = false }: { btn?: boolean }) {
  const router = useRouter();
  if (!btn) {
    return (
      <Button
        onClick={() => router.push("/dashboard/categories?addNew=true")}
        size={"icon"}
      >
        <Plus />
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => router.push("/dashboard/categories?addNew=true")}
        variant={"outline"}
        className="mx-auto"
      >
        Add Now <Plus />
      </Button>
    );
  }
}

export default AddCategoryBtn;
