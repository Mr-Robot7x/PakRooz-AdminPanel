import dbConnect from "@/lib/DBConnect";
import Category from "@/Models/category.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description, images } = await req.json();

  if (!name || !description) {
    return NextResponse.json({
      message: "Name and Description is required",
      success: false,
    });
  }

  if (images.length === 0) {
    return NextResponse.json({
      message: "Upload At least One Image",
      success: false,
    });
  }

  try {
    dbConnect();
    const isAleradyExist = await Category.findOne({ name });

    if (isAleradyExist) {
      return NextResponse.json({
        message: "Category with this name alerady exist, try another name",
        success: false,
      });
    }

    const newCategory = new Category({
      name,
      description,
      images,
    });

    await newCategory.save();

    return NextResponse.json({
      message: "New Category Successfully Created",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error?.message,
        success: false,
      });
    }
    return NextResponse.json({
      message: "Something Went Wrong From Server, try again",
      success: false,
    });
  }
}
