import mongoose, { Schema, model, Document, models } from 'mongoose';


export interface IProduct extends Document {
  productName: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
  properties: Array<{ key: string; value: string }>;
  reviews?: Array<{
    user: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }>;
  discount?: number;
  categories: mongoose.Schema.Types.ObjectId;
  brand?: string;
  isFeatured?: boolean;
}

const ProductSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String],
    required: [true, "product images is required"]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  properties: [
    {
      key: { type: String, required: [true, "must have one property"] },
      value: { type: String, required: [true, "must have one property"] },
    },
  ],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      rating: { type: Number, min: 0, max: 5, required: true },
      comment: { type: String, trim: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  discount: {
    type: Number,
    min: 0,
    max: 100,
  },
  categories: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },

  brand: {
    type: String,
    trim: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});


const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
