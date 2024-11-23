import dbConnect from "@/lib/DBConnect";
import Category from "@/Models/category.model";
import { NextRequest, NextResponse } from "next/server";
import { deleteImage } from "../upload/route";

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


export async function GET(req: NextRequest) {

  const {searchParams} = new URL(req.url);

  const limit = searchParams.get("limit") || null;
  const id = searchParams.get("id") || null;

  if (limit !== null) {
    dbConnect();
    try {
      const categories = await Category.find({}).sort({ createdAt: -1 }).limit(parseInt(limit));
      if (!categories || categories.length === 0) {
        return NextResponse.json({
          message: "Don't Have Any Categories, please add some",
          success: false,
          notFound: true
        })
      }else{
        return NextResponse.json({
          message: "Categories Fetched Successfully",
          success: true,
          categories
        })
      }
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
      })
    }
  }

  if (id !== null){
    const category = await Category.findById({_id: id});
    if (category) {
      return NextResponse.json({
        message : "fetched",
        success : true,
        category
      })
    }
    return NextResponse.json({
        message : "cannot found category",
        success : false,
        NotFound : true
      })
  }


  const allCategories = Category.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ message: "all fetched", success: true, allCategories});
}


export async function PUT(req:NextRequest) {
    const {name, description, images, id} = await req.json();

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

    const updatedCategory = await Category.findByIdAndUpdate
    (
      {_id: id},
      {name, description, images}, 
      {new: true}
    );

    return NextResponse.json({message: "category updated", success: true, updatedCategory});

}


export async function DELETE(req:NextRequest) {

  const {id, url} = await req.json();

  if (!id || !url) {
    return NextResponse.json({
      message: 'product id is required for deletion',
      success: false,
    })
  }

  const isDeleted = deleteImage(url);

  if (!isDeleted){
    return NextResponse.json({
      message: 'Cannont Delete images of category, try again',
      success: false,

    })
  }

  const deletedCategory = await Category.findByIdAndDelete({_id: id});

  if (!deletedCategory) {
    return NextResponse.json({
      message: 'Cannot Delete Category, try again',
      success: false,
    })
  }

  return NextResponse.json({message: "category deleted", success: true, deletedCategory});
}


 



             