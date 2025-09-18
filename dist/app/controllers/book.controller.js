"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookApi = void 0;
const express_1 = require("express");
const book_model_1 = require("../models/book.model");
exports.bookApi = (0, express_1.Router)();
// Create Book
exports.bookApi.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error,
        });
    }
}));
// Get All Books
exports.bookApi.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = 10, } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
            .limit(Number(limit));
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve books",
            error: error,
        });
    }
}));
// Get Book by ID
exports.bookApi.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve book",
            error: error,
        });
    }
}));
// Update Book
exports.bookApi.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(bookId, req.body, {
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update book",
            error: error,
        });
    }
}));
// Delete Book
exports.bookApi.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(bookId);
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete book",
            error: error,
        });
    }
}));
