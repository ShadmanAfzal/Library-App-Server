import {addBook, deleteBook, getBook, updateBook} from '../repository/booksRepository.js';
import { booksValidator, updateBookValidator } from '../utils/validator/booksValidator.js';

export const getBooks = async (req,res) => {
    try {
        const currentPage = Number(req.query.page ?? 1);
        
        const books = await getBook(currentPage);
        
        res.json({success: true, message: 'ok', ...books});
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }   
}

export const addBooks = async (req,res) => {
    try {

        console.log(req.body);
        const validationResult = booksValidator.validate(req.body);


        if(validationResult.error){
            return res.status(400).json({success: false, message: validationResult.error.message})
        }

        await addBook(req.body);
        res.json({success: true, message: 'book added successfully'});
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }   
}

export const updateBooks = async (req,res) => {
    try {
        const id = req.params.id;

        const validationResult = updateBookValidator.validate(req.body);

        if(validationResult.error){
            return res.status(400).json({success: false, message: validationResult.error.message})
        }

        res.json(await updateBook(id,req.body));
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }   
}

export const deleteBooks = async (req,res) => {
    try {
        const id = req.params.id;

        res.json(await deleteBook(id));
    } catch (error) {
        res.status(500).json({success:false, message: error.message})
    }   
}