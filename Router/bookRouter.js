import express from 'express';
import { addBooks, deleteBooks, filterBooks, getBookById, getBooks, searchBooks, updateBooks } from '../Controller/booksController.js';

const booksRouter = express.Router();

booksRouter.get('/', getBooks);

booksRouter.post('/', addBooks);

booksRouter.get('/:id', getBookById);

booksRouter.post('/search', searchBooks);

booksRouter.post('/filter', filterBooks);

booksRouter.patch('/:id', updateBooks);

booksRouter.delete('/:id', deleteBooks);

export default booksRouter;