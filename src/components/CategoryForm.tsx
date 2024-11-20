"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DeleteIcon, Edit, FileWarning, Loader, Plus, X } from "lucide-react";
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

const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),

  description: z.string().min(10, {
    message: "Category description must be at least 10 characters.",
  }),
});

function CategoryForm({ isEdit = false }: { isEdit?: boolean }) {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [panding, setPanding] = useState(false);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof categorySchema>) => {
    setPanding(true);

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
    };

    try {
      const response = await fetch("/api/category", {
        method: "POST",
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

  const handleUploadComplete = (urls: string[]) => {
    setUploadedUrls(urls); // Save the URLs in the main page state
    console.log("Uploaded URLs in Main Page:", urls);
    console.log("Uploaded URLs In State:", uploadedUrls.length);
  };

  const router = useRouter();
  return (
    <section id="category-form">
      <div className="w-full flex items-center justify-end gap-3">
        {isEdit && (
          <Button variant={"destructive"} size={"sm"}>
            <DeleteIcon /> delete
          </Button>
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

          <div className="w-full flex items-start justify-start gap-3 flex-col">
            <Label>Category Images</Label>
            <ImageUploader onUploadComplete={handleUploadComplete} />
            <small className="text-muted-foreground -mt-1">
              help to better reconize your category
            </small>
          </div>

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
