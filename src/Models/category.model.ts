import { models } from 'mongoose';
import { Schema, model, Document } from 'mongoose';

// Define an interface to ensure strong typing
interface ICategory extends Document {
  name: string;
 
  description?: string;
  images?: string[];
}

// Define the schema for categories
const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  
  description: {
    type: String,
    trim: true,
  },
  images: {
    type: [String],
    required: [true, "product images is required"]
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const Category = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
