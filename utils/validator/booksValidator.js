import Joi from "joi";
import { BOOK_CATEGORY } from "../enum/bookCategory.js";

export const booksValidator = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Please enter title for the product",
        "any.required": "Title is required",
    }),
    description: Joi.string().required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Please enter description for the product",
        "any.required": "Description is required for this product",
    }),
    author: Joi.string().required().messages({
        "string.base": "Author name must be a string",
        "string.empty": "Please enter author of the book",
        "any.required": "Book author is required for this product",
    }),
    photo_url: Joi.string().uri().required().messages({
        "string.base": "Url must be in string format",
        "string.empty": "Please image url for the product",
        "any.required": "Image url is required for this product",
        "*": "Please provide valid url",
    }),
    genre: Joi.string().valid(...Object.values(BOOK_CATEGORY))
        .messages({ '*': 'Genre must be one of Comedy, Science fiction, Biography, Triller, Action, Comic, Mystery, Historical' }),
});

export const updateBookValidator = Joi.object({
    title: Joi.string().messages({
        "string.base": "Title must be a string",
        "string.empty": "Please enter title for the product",
    }),
    description: Joi.string().messages({
        "string.base": "Description must be a string",
        "string.empty": "Please enter description for the product",
    }),
    author: Joi.string().messages({
        "string.base": "Author name must be a string",
        "string.empty": "Please enter author of the book",
    }),
    photo_url: Joi.string().uri().messages({
        "string.base": "Url must be in string format",
        "string.empty": "Please image url for the product",
        "*": "Please provide valid url",
    }),
    genre: Joi.string()
        .valid(...Object.values(BOOK_CATEGORY))
        .messages({ '*': 'Genre must be one of Comedy, Science fiction, Biography, Triller, Action, Comic, Mystery, Historical' })
});