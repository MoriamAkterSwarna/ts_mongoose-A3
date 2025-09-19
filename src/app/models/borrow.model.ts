import { Schema, model, } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  dueDate: { type: Date, required: true },
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
