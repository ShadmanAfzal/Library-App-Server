import express from "express";
import booksRouter from "./Router/bookRouter.js";
import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler.js";
import { config } from "./Config/config.js";

const app = express();

const PORT = config.PORT || 8080;

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({ 'success': true });
})

app.use('/api/v1/books', booksRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})