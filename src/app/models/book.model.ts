import { Schema, model } from "mongoose";
import { IBook, Genre } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true, enum: Object.values(Genre) },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  available: { type: Boolean, default: true },
});

export const Book = model<IBook>("Book", bookSchema);
