import { Document, model, Schema } from "mongoose";

export type ProductModel = Document & {
  name: string;
  quantity: number;
  price: number;
  images: string[];
  hidden: boolean;
};

const ProductSchema = new Schema<ProductModel>({
  name: {
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
});

export default model<ProductModel>("products", ProductSchema, "products");
