import express from 'express';
import { addBooks, deleteBooks, getBooks, updateBooks } from '../Controller/booksController.js';

const booksRouter = express.Router();

booksRouter.get('/', getBooks);
booksRouter.post('/', addBooks);
booksRouter.patch('/:id', updateBooks);
booksRouter.delete('/:id', deleteBooks);

export default booksRouter;