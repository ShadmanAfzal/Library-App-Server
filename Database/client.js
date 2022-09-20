import { Sequelize } from "sequelize";
import BookModel from "../Model/book.model.js";

const client = new Sequelize("postgresql://postgres:justin12345@localhost:5432/library", { logging: false });

client.authenticate()
    .then(() => console.log('connected to database'))
    .catch((error) => console.log('Unable to connect to the database: ', error));

const BookClient = client.define('library-book', BookModel);

client.sync()
    .then(() => console.log('Book table created successfully!'))
    .catch((error) => console.error('Unable to create table : ', error));

export default BookClient;