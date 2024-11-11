import dbConnect from "@/lib/DBConnect";
import adminModel from "@/Models/admin.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export async function POST(req:NextRequest) {
    const {email,password, name} = await req.json();
    
    if (!email || !password || !name) {
        return  NextResponse.json({
            message: "All fields are required",
            success: false,
        }, { status: 400 });
    }
    
    try {
        dbConnect();
        const isExitedAdmin = await adminModel.findOne({email});

        if (isExitedAdmin) {
           return  NextResponse.json({
            message: "Admin Alerady Exists, Try Another Email",
            success: false,
        }, { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = new adminModel({
            email,
            password: hashPassword,
            name
        });

        await newAdmin.save();

        return NextResponse.json({
            message: "Admin Created Successfully",
            success: true,
        }, { status: 201 });

    } catch (err) {
        if (err instanceof Error) {
           return NextResponse.json({
                message: err.message,
                success: false
            })              
       }
       throw new Error('An unexpected error occurred'); 
    }

}