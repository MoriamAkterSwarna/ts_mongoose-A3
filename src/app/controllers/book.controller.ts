

import { Request, Response, Router } from "express";
import { Book } from "../models/book.model";
import { IBook } from "../interfaces/book.interface";

export const bookApi = Router();

// Create Book
bookApi.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body as IBook);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
    });
  }
});

// Get All Books
bookApi.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = 10,
    } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
      .limit(Number(limit));
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve books",
      error: error,
    });
  }
});

// Get Book by ID
bookApi.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve book",
      error: error,
    });
  }
});

// Update Book
bookApi.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to update book",
      error: error,
    });
  }
});
// Delete Book
bookApi.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to delete book",
      error: error,
    });
  }
});