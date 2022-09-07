import express from "express";
import dotenv from "dotenv";
import booksRouter from "./Router/bookRouter.js";
import pg from "pg";
import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors());

export const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();


app.get('/',(req,res)=> {
    res.json({'success': true});
})

app.use('/api/v1/books', booksRouter);

app.use(errorHandler);

app.listen(PORT, ()=> {
    console.log(`server running at ${PORT}`);
})