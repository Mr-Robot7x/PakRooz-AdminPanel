"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Delete, EditIcon, FileWarning, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

import ImageUploader from "@/components/UploadComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  productName: z
    .string()
    .min(10, {
      message: "Product name must be at least 10 characters.",
    })
    .max(100, {
      message: "Product name must be at most 100 characters.",
    }),
  description: z.string().min(20, {
    message: "Product description must be at least 20 characters.",
  }),
  categories: z.string({}).nonempty("Please select a category"),
  // createdBy: z.string(),
  price: z.string().min(1, {
    message: "price will be greater than 0",
  }),
  stock: z.string().min(1, {
    message: "at least one item in stock",
  }),
});

function AddProducts() {
  const { data: Session } = useSession();
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [properties, setProperties] = useState<
    { key: string; value: string }[]
  >([]);

  const [key, setKey] = useState("");
  const [value, setvalue] = useState("");
  const [brand, setBrand] = useState("");
  const [discout, setDiscount] = useState("");
  const [focus, setFoucus] = useState<null | number>(null);
  const router = useRouter();
  const handleAdd = () => {
    if (!key || !value) {
      return;
    }
    setProperties((prevProperties) => [...prevProperties, { key, value }]);
    setKey("");
    setvalue("");
  };

  const handleDel = (index: number) => {
    setProperties((prevProperties) =>
      prevProperties.filter((_, i) => i !== index)
    );
  };

  function handlePropertyNameChange(index: number, newKey: string) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].key = newKey;
      return properties;
    });
  }

  function handlePropertyValuesChange(index: number, newValue: string) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties;
    });
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productName: "", //
      description: "", //
      price: "", //
      stock: "", //
      categories: "", //
    },
  });

  const handleUploadComplete = (urls: string[]) => {
    setUploadedUrls(urls); // Save the URLs in the main page state
    console.log("Uploaded URLs in Main Page:", urls);
    console.log("Uploaded URLs In State:", uploadedUrls.length);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (uploadedUrls.length === 0) {
      toast({
        title: "Product Images Required",
        description: (
          <div className="flex items-center gap-x-2 mt-2">
            <FileWarning stroke="red" />{" "}
            <p className="text-sm">Please upload at least one image</p>
          </div>
        ),
      });
      return;
    }
    if (properties.length === 0) {
      toast({
        title: "Product Properties Required",
        description: (
          <div className="flex items-center gap-x-2 mt-2">
            <FileWarning stroke="red" />{" "}
            <p className="text-sm">Please add at least one property</p>
          </div>
        ),
      });
      return;
    }
    const ComData = {
      ...data,
      images: uploadedUrls,
      properties,
      brand,
      discount: discout,
      createdBy: Session?.user._id,
      reviews: [],
      isFeatured: false,
    };

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ComData),
      });

      if (response.ok) {
        console.log("Response From API : ", response);
        const serData = await response.json();
        if (!serData?.success) {
          toast({
            title: "Error",
            description: serData?.message,
            className: " bg-gradient-to-r from-red-500 to-red-600 text-white",
          });
        } else {
          toast({
            title: "Success",
            description: serData?.message,
            className:
              " bg-gradient-to-r from-green-500 to-green-600 text-white",
          });
          form.reset();
          router.push("/products");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
      console.log(error);
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(ComData, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    console.log(ComData);
    //   form.reset();
  }

  return (
    <Container>
      <section className="py-5 px-3  rounded-3xl">
        <div className="flex items-end gap-x-3">
          <Button className="md:h-14 w-12" size={"icon"} variant={"outline"}>
            <ArrowLeft />
          </Button>
          <div>
            <small>back to products list</small>
            <h1>
              Add New <span className="text-red-500">Product</span>
            </h1>
          </div>
        </div>
        <div className="w-full mt-6 relative grid md:grid-cols-2 grid-cols-1 gap-2 pb-20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white space-y-3 p-5 rounded-3xl shadow"
            >
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="product name" {...field} />
                    </FormControl>
                    <FormDescription className="text-sm">
                      detail product name
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
                    <FormLabel className="font-bold">
                      Product description
                    </FormLabel>
                    <FormControl>
                      <textarea
                        id=""
                        className="w-full min-h-32"
                        placeholder="product description"
                        {...field}
                      ></textarea>
                    </FormControl>
                    <FormDescription className="text-sm">
                      detail product desciption
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Product Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="product price"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Product Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="product stock"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Select Product Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        // value={field.value}
                        {...field}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={Session?.user._id}>
                            Doctor
                          </SelectItem>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Miss">Miss</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button
                className="absolute bottom-0 left-5 bg-gradient-to-t from-red-500 to-red-600 w-[300px] md:py-7"
                type="submit"
                size={"lg"}
              >
                <Plus /> Add Product
              </Button>
            </form>
          </Form>
          <div className="bg-white p-5 rounded-3xl shadow">
            <h3>Upload Images</h3>
            <ImageUploader onUploadComplete={handleUploadComplete} />
            <div className="min-h-32 mt-5">
              <div>
                <Label htmlFor="brand" className="font-semibold text-lg ">
                  Brand
                </Label>
                <Input
                  id="brand"
                  className="mt-1"
                  placeholder="product Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <small>Add Product Brand if exist</small>
              </div>
              <div className="mt-2">
                <Label htmlFor="discout" className="font-semibold text-lg ">
                  Discount Value
                </Label>
                <Input
                  id="discout"
                  className="mt-1"
                  type="number"
                  value={discout}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Discount value"
                />
                <small>Discont value in percentage</small>
              </div>
              <div className="mt-2">
                <Label className="font-semibold text-lg ">
                  Product Properties
                </Label>
                <small className="block text-sm">
                  properties i.e color : red, size: large{" "}
                </small>

                <div className="flex mt-2 gap-2 flex-wrap">
                  <Input
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    name="key"
                    placeholder="Name i.e color"
                  />

                  <Input
                    name="value"
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    placeholder="Value i.e red"
                  />
                </div>
                <Button className="mt-2" onClick={handleAdd}>
                  Add
                </Button>

                {properties.length > 0 &&
                  properties.map((property, index) => (
                    <div key={index} className="flex mt-5 gap-2 flex-wrap">
                      <input
                        value={property.key}
                        className={`w-44 h-10 flex justify-center items-center bg-white border rounded-md font-semibold ${
                          focus === index ? "border-2 border-black" : ""
                        }`}
                        onChange={(ev) => {
                          setFoucus(null);
                          handlePropertyNameChange(index, ev.target.value);
                        }}
                      />
                      <input
                        value={property.value}
                        onChange={(ev) =>
                          handlePropertyValuesChange(
                            index,

                            ev.target.value
                          )
                        }
                        className="w-44 h-10 flex justify-center items-center bg-white border rounded-md font-semibold"
                      />

                      <div className="flex gap-1 ">
                        <Button
                          onClick={() => setFoucus(index)}
                          variant={"outline"}
                          size={"icon"}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          onClick={() => handleDel(index)}
                          variant={"destructive"}
                          size={"icon"}
                        >
                          <Delete />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default AddProducts;
