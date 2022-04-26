import { Document, model, Schema, Types } from "mongoose";

export type Review = Document & {
  rating: number;
  user: {
    first: string;
    last: string;
    _id: Types.ObjectId;
  };
  review: {
    title: string;
    body: string;
  };
};

export type ProductModel = Document & {
  name: string;
  description: string;
  quantity: number;
  price: number;
  images: string[];
  hidden: boolean;
  reviews: Review[];
};

const ReviewSchema = new Schema<Review>({
  rating: {
    type: Number,
    required: true,
  },
  user: {
    _id: { type: Schema.Types.ObjectId, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  review: {
    title: { type: String, required: true },
    body: { type: String, required: true },
  },
});

const ProductSchema = new Schema<ProductModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
      default: [],
    },
  ],
  hidden: {
    type: Boolean,
    required: true,
    default: false,
  },
  reviews: [
    {
      type: ReviewSchema,
      default: [],
    },
  ],
});

export default model<ProductModel>("products", ProductSchema, "products");
