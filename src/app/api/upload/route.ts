import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import os from 'os'; // For getting the OS-specific temporary directory
import extractPublicIdFromUrl from '@/lib/ExtractPublicID';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }
    console.log("file comes :");
    
    // Get the file buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    console.log("buffer completed");
    
    // Use os.tmpdir() to get the appropriate temporary directory based on the OS
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, fileName);

    // Save file temporarily to the server
    await fs.promises.writeFile(filePath, fileBuffer);
    console.log({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath);

    // Remove the temporary file from the server
    await fs.promises.unlink(filePath);

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.log("Catch Error: ",error);
    
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function deleteImage(url: string) {
  console.log('comes here');
  
  const publicID = extractPublicIdFromUrl(url);
  console.log('public_id' , publicID);
  
  if (!publicID) {
    console.error("Invalid image URL:", publicID);
    return false
  }

  try {
    await cloudinary.api.delete_resources([publicID], {
      type: 'upload',
      resource_type: 'image',

    } ,(error, result) => {
      if (error) {
        console.error("Error deleting image:", error);
      } else {
        console.log("Image deleted:", result);
        return true
      }
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return false
  }
}

