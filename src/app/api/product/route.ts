import { NextRequest, NextResponse } from "next/server";
import Product from "@/Models/product.model";
import dbConnect from "@/lib/DBConnect";

export  async function POST(req:NextRequest) {
    const {
        productName,//
        description,
        price,//
        stock,//
        images,
        createdBy,
        properties,
        reviews,
        discount,
        categories,//
        brand,
        isFeatured } = await req.json();
       
    if ([productName, description, price, stock, brand, categories, createdBy].some((item) => item === "")) {
        return NextResponse.json({
            message: "All fields are required",
            success: false,
        }, { status: 400 });
    }

    if (images.length <=0) {
        return NextResponse.json({
            message: "products images are required!!",
            success: false
        })
    }

    if (properties.length <= 0){
        return NextResponse.json({
            message: "Atlest One Property in required",
            success: false
        })
    }

   try {
    dbConnect()
    const isExitedProduct = await Product.findOne({productName})
   if (isExitedProduct) {
     return NextResponse.json({
            message: "Product With This Name Already Exists, try another name",
            success: false
        })
   }
     const products = new Product({
        productName,
        description,
        price,
        stock,
        images,
        createdBy,
        properties,
        reviews: reviews || [],
        discount: discount || 0,
        categories,
        brand: brand || "",
        isFeatured: isFeatured ? true : false
    })
    await products.save();
    return NextResponse.json({
        message: "Product Added Successfully",
        id: products._id,
        success: true
    })
   } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                success: false
            })
        }
        return NextResponse.json({
            message: "Something went wrong",
            success: false
        })
   }
}