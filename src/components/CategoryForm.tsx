"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DeleteIcon, Edit, FileWarning, Loader, Plus, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ImageUploader from "./UploadComponent";
import { Label } from "./ui/label";
import { Category } from "@/Types/category";
import { Skeleton } from "./ui/skeleton";
const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),

  description: z.string().min(10, {
    message: "Category description must be at least 10 characters.",
  }),
});

function CategoryForm({
  isEdit = false,
  id,
}: {
  isEdit?: boolean;
  id?: string;
}) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [panding, setPanding] = useState(false);
  const [categoryData, setCategoryData] = useState<Category | null>(null);

  console.log("ID in Form", id);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (id) {
      const getCategory = async () => {
        setCategoryData(null);
        try {
          const response = await fetch(`/api/category?id=${id}`);
          if (response.ok) {
            const data = await response.json();
            setCategoryData(data?.category);

            reset({
              name: data?.category.name || "",
              description: data?.category.description || "",
            });
          }
        } catch (error) {
          if (error instanceof Error) {
            toast({
              title: "Error",
              description: error.message,
            });
          }
          toast({
            title: "Something Went Wrong",
            description: "Something went wrong on the server",
          });
        }
      };

      getCategory();
    }
  }, [id, reset]);

  const handleSubmit = async (data: z.infer<typeof categorySchema>) => {
    setPanding(true);
    console.log("uploaded Urls :: ", uploadedUrls);

    if (uploadedUrls.length === 0) {
      toast({
        title: "Category Images Required",
        description: (
          <div className="flex items-center gap-x-2 mt-2">
            <FileWarning stroke="red" />
            <p className="text-sm">Please upload at least one image</p>
          </div>
        ),
      });
      setPanding(false);
      return;
    }

    const Data = {
      ...data,
      images: uploadedUrls,
      id: id,
    };

    try {
      const response = await fetch("/api/category", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(Data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const resData = await response.json();

        if (resData?.success === false) {
          toast({
            title: "Error",
            description: resData?.message,
            className: " bg-gradient-to-r from-red-500 to-red-600 text-white",
          });
        } else {
          toast({
            title: "Success",
            description: resData?.message,
            className:
              " bg-gradient-to-r from-green-500 to-green-600 text-white",
          });

          setUploadedUrls([]);
          form.reset();
          router.push("/dashboard/categories");
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error h",
        description: error.message || "Something Went Wrong",
      });
    } finally {
      setPanding(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    const response = await fetch(`/api/category`, {
      body: JSON.stringify({
        id: id,
        url: uploadedUrls[0],
      }),
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      if (!data?.success) {
        toast({
          title: "Error",
          description: data?.message,
          className: " bg-gradient-to-r from-red-500 to-red-600 text-white",
        });
      }

      toast({
        title: "Success",
        description: data?.message,
        className: " bg-gradient-to-r from-green-500 to-green-600 text-white",
      });
      router.push("/dashboard/categories");
    }
  };

  const handleUploadComplete = (urls: string[]) => {
    setUploadedUrls(urls); // Save the URLs in the main page state
    console.log("Uploaded URLs in Main Page:", urls);
    console.log("Uploaded URLs In State:", uploadedUrls.length);
  };

  // getCategoryData();
  const router = useRouter();
  return (
    <section id="category-form">
      <div className="w-full flex items-center justify-end gap-3">
        {isEdit && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} size={"sm"}>
                Delete <DeleteIcon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure to delete {categoryData?.name} category?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Once it delete, it will not recover
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive"
                  onClick={() => handleDelete(id)}
                >
                  delete Now
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Button
          onClick={() => router.push("/dashboard/categories")}
          size={"icon"}
          variant={"ghost"}
        >
          <X />
        </Button>
      </div>
      <h2 className="text-center">
        {isEdit ? "Edit Category" : "Add New Category"}
      </h2>
      <Form {...form}>
        <form
          className="space-y-3 mt-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="product name" {...field} />
                </FormControl>
                <FormDescription className="text-sm">
                  category name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            defaultValue={categoryData?.description || ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">desciption</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="category description" />
                </FormControl>
                <FormDescription className="text-sm">
                  detail category description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {id ? (
            <>
              {categoryData && categoryData?.images.length > 0 ? (
                <div className="w-full flex items-start justify-start gap-3 flex-col">
                  <Label>Category Images</Label>
                  <ImageUploader
                    imagesUrl={categoryData?.images}
                    onUploadComplete={handleUploadComplete}
                  />
                  <small className="text-muted-foreground -mt-1">
                    help to better reconize your category
                  </small>
                </div>
              ) : (
                <Skeleton className="w-full h-40" />
              )}
            </>
          ) : (
            <div className="w-full flex items-start justify-start gap-3 flex-col">
              <Label>Category Images</Label>
              <ImageUploader onUploadComplete={handleUploadComplete} />
              <small className="text-muted-foreground -mt-1">
                help to better reconize your category
              </small>
            </div>
          )}

          <Button disabled={panding} size={"lg"}>
            {panding ? (
              <>
                <Loader className="animate-spin" /> Submiting ...
              </>
            ) : isEdit ? (
              <>
                Edit Category <Edit />
              </>
            ) : (
              <>
                Add Category <Plus />
              </>
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}

export default CategoryForm;
