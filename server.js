import express from "express";
import dotenv from "dotenv";
import booksRouter from "./Router/bookRouter.js";
import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler.js";
import chalk from "chalk";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({ 'success': true });
})

app.use('/api/v1/books', booksRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(chalk.green.bold.inverse(`server running at ${PORT}`));
})