import Joi from 'joi';
import { addBook, deleteBook, filterBook, getBook, searchBook, updateBook } from '../repository/booksRepository.js';
import { BOOK_CATEGORY } from '../utils/enum/bookCategory.js';
import { booksValidator, updateBookValidator } from '../utils/validator/booksValidator.js';

export const getBooks = async (req, res) => {
    try {
        const currentPage = Number(req.query.page ?? 1);

        const sortBy = req.query.sortBy;

        const books = await getBook(currentPage, sortBy);

        res.json({ success: true, message: 'ok', ...books });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const addBooks = async (req, res) => {
    try {

        console.log(req.body);
        const validationResult = booksValidator.validate(req.body);


        if (validationResult.error) {
            return res.status(400).json({ success: false, message: validationResult.error.message })
        }

        await addBook(req.body);
        res.json({ success: true, message: 'book added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const updateBooks = async (req, res) => {
    try {
        const id = req.params.id;

        const validationResult = updateBookValidator.validate(req.body);

        if (validationResult.error) {
            return res.status(400).json({ success: false, message: validationResult.error.message })
        }

        res.json(await updateBook(id, req.body));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const deleteBooks = async (req, res) => {
    try {
        const id = req.params.id;

        res.json(await deleteBook(id));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const searchBooks = async (req, res) => {
    try {
        const currentPage = Number(req.query.page ?? 1);

        const searchQuery = req.body.searchQuery;

        if (!searchQuery) {
            return res.status(400).json({ success: false, message: 'searchQuery required' });
        }

        res.json(await searchBook(currentPage, searchQuery));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const filterBooks = async (req, res) => {
    try {
        const currentPage = Number(req.query.page ?? 1);

        const sortBy = req.query.sortBy;

        const filterValidator = Joi.object({
            filter: Joi.string().valid(...Object.values(BOOK_CATEGORY))
                .messages({ '*': 'Genre must be one of Comedy, Science fiction, Biography, Triller, Action, Comic, Mystery, Historical' })
        });

        const filterResult = filterValidator.validate(req.body);

        if (filterResult.error) {
            return res.status(400).json({ success: false, message: filterResult.error.message })
        }

        res.json(await filterBook(currentPage, req.body.filter, sortBy));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}