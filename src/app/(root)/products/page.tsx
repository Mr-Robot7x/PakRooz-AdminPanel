import Container from "@/components/Container";
import { DataTableDemo } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <Container>
      <section className="bg-gray-50 py-5 px-3 min-h-screen">
        <h1>Manage Your Products</h1>
        <Link href={"/products/add"}>
          <Button className="bg-gradient-to-t from-red-500 to-red-600 mt-4 text-lg">
            <PackagePlus /> Add Product
          </Button>
        </Link>
        <div className="w-full mt-10">
          <DataTableDemo />
        </div>
      </section>
    </Container>
  );
}

export default page;
