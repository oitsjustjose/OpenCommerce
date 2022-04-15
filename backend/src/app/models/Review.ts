import { Document, model, Schema, ObjectId, Types } from "mongoose";

export type ReviewModel = Document & {
  productId: ObjectId;
  userId: ObjectId;
  rating: number; // Out of Decimal from 0.0 to 5.0 (stars)
  reviewTitle: string; // General title of the review left
  reviewBody: string; // The actual review left behind.
};

const PRSchema = new Schema<ReviewModel>({
  productId: {
    type: Types.ObjectId,
    ref: "products",
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "users",
    required: true,
  },
  rating: Number,
  reviewTitle: String,
  reviewBody: String,
});

export default model<ReviewModel>("productReviews", PRSchema, "productReviews");
