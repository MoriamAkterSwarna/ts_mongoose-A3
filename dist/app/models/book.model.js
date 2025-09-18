"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const book_interface_1 = require("../interfaces/book.interface");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true, enum: Object.values(book_interface_1.Genre) },
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
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
