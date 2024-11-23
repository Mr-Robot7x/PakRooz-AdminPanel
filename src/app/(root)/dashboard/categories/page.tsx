import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileWarning,
  MoreHorizontal,
  PlusIcon,
} from "lucide-react";
import CategoryForm from "@/components/CategoryForm";
import AddCategoryBtn from "@/components/AddCategoryBtn";
import { Categories } from "@/Types/category";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "@/components/CategoryCard";
import CategorySearch from "./CategorySearch";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ addNew: string; edit: string }>;
}) {
  const addNew = (await searchParams).addNew;
  const editID = (await searchParams).edit;

  console.log("edit ID :: ", editID);

  let error = "";
  const response = await fetch(
    `${process.env.PAKROOZ_PUBLIC_URL}/api/category?limit=6`
  );
  const data: Categories = await response.json();

  if (!data.success) {
    error = data.message;
  }
  console.log(error);

  return (
    <Container>
      <h1 className="pt-5">Create & Manage Categories</h1>
      <div className="w-full mt-8 min-h-screen grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 transition-all">
        <div
          className={`lg:col-span-3 ${
            addNew || editID ? "order-2" : "order-1"
          } py-4 px-2 col-span-full bg-card border rounded-3xl`}
        >
          <div className="flex justify-between gap-1 items-center">
            <div className="flex gap-1 items-center">
              <CategorySearch category={data.categories} />
            </div>
            <div className="flex items-center gap-2">
              <AddCategoryBtn />

              <Button variant={"secondary"} size={"icon"}>
                <MoreHorizontal />
              </Button>
            </div>
          </div>
          <div className="flex items-start mt-5 justify-start gap-y-4 flex-col">
            {data?.categories ? (
              data.categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))
            ) : error ? (
              <>
                <FileWarning
                  className="mx-auto mt-10 text-destructive"
                  size={40}
                />
                <h3 className="text-center  mx-auto text-destructive">
                  {error && error}
                </h3>

                <AddCategoryBtn btn={true} />
              </>
            ) : (
              [1, 2, 3, 4, 5, 6].map((index) => (
                <Skeleton
                  key={index}
                  className="w-full h-20 gap-2 flex items-center p-1 bg-secondary rounded-2xl relative overflow-hidden"
                >
                  <Skeleton className="w-16 h-16 rounded-lg bg-muted-foreground/20" />
                  <div className="flex flex-col gap-1 w-[80%]">
                    <Skeleton className="w-11/12 h-7 rounded-lg bg-muted-foreground/20" />
                    <Skeleton className="w-2/3 h-7 rounded-lg bg-muted-foreground/20" />
                  </div>
                </Skeleton>
              ))
            )}
            {!error && (
              <Button className="mx-auto mt-2" variant={"ghost"}>
                View All Categories <ArrowRight />
              </Button>
            )}
          </div>
        </div>

        {addNew || editID ? (
          <div
            className={`lg:col-span-4 ${
              addNew || editID ? "order-1" : "order-2"
            } col-span-full bg-card border rounded-3xl py-3 md:px-4 px-2`}
          >
            {editID ? (
              <CategoryForm isEdit id={editID && editID} />
            ) : (
              <CategoryForm />
            )}
          </div>
        ) : null}
      </div>
    </Container>
  );
}

export default page;
