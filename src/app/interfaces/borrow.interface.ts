import { Types } from "mongoose";
import { IBook } from "./book.interface";

export interface IBorrow {
  book: Types.ObjectId | IBook;
  quantity: number;
  dueDate: Date;
}
