import { toast } from "@/hooks/use-toast";
import { Loader, Upload } from "lucide-react";
import React, { useState } from "react";

interface ImageUploaderProps {
  onUploadComplete?: (uploadedUrls: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null); // New state for errors
  const handleFilesUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files);
    setImages((prev) => [...prev, ...newImages]);

    const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFilesUpload(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesUpload(e.target.files);
  };

  const handleUpload = async () => {
    setUploading(true);
    setError(null); // Reset error before starting upload

    try {
      const uploadedUrls: string[] = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            toast({
              title: "Failed To Upload Image",
              description:
                "cannont upload images beacuse of network or something else",
            });
            throw new Error(errorData.message || "Upload failed");
          }

          const data = await response.json();
          return data.url; // Adjust to match the field your API returns for the Cloudinary URL
        })
      );

      setUploadedUrls((prev) => {
        const updatedUrls = [...prev, ...uploadedUrls];

        // Call onUploadComplete with the updated URLs
        if (onUploadComplete) {
          onUploadComplete(updatedUrls);
        }
        return updatedUrls;
      });

      console.log("Uploaded URLs:", uploadedUrls);

      // Clear selected images and previews only if upload is successful
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error("Upload failed", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center p-4 border border-dashed rounded-md bg-secondary transition-colors">
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="w-full flex flex-col items-center justify-center text-gray-500 cursor-pointer"
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="cursor-pointer text-center">
            <Upload className="mx-auto size-9 stroke-red-500" />
            <p className="text-lg font-semibold mt-3">
              Drag and drop images here
            </p>
            <p className="text-sm mt-1">or click to select files</p>
          </label>
        </div>

        {/* Initial Previews for selected files */}
        {previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative w-24 h-24 opacity-50">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        {/* Uploaded previews from Cloudinary */}
        <p className="error-text mt-1 text-sm text-red-500">{error}</p>
        {images.length > 0 && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            type="button"
            className="mt-4 px-4 py-2 bg-primary rounded  disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader
                  size={20}
                  className="inline-block animate-spin duration-[1s]"
                />{" "}
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        )}
      </div>
      {uploadedUrls.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4 w-full">
          {uploadedUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-20 h-20 shadow-lg rounded-md bg-secondary p-1"
            >
              <img
                src={url}
                alt={`Uploaded Image ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ImageUploader;
