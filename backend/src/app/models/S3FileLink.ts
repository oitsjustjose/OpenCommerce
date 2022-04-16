import { Document, model, Schema } from "mongoose";

export type FileModel = Document & { key: string };

const FileSchema = new Schema<FileModel>({
  key: { type: String, required: true },
});

export default model<FileModel>("files", FileSchema, "files");
