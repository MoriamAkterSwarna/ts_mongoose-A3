/* eslint-disable @typescript-eslint/no-explicit-any */


import { Request, Response, Router } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { IBorrow } from "../interfaces/borrow.interface";

export const borrowApi = Router();

borrowApi.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }
    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }
    await book.save();
    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    } as IBorrow);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to borrow book",
      error: error,
    });
  }
});
// Borrowed Books Summary
borrowApi.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error: error,
    });
  }
});