import { client } from "../server.js"
import { SortBooks } from "../Services/sortBooks.js";
import BookError from "../utils/error/error.js";

const UUID_REGEX = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const ITEM_PER_PAGE = 5;

export const getBooks = async (currentPage, sortBy) => {

    const result = await client.query(`SELECT * FROM books;`);

    const sortedResult = SortBooks(result.rows, sortBy);

    const paginatedResult = sortedResult.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return { 'totalPage': Math.ceil(result.rowCount / ITEM_PER_PAGE), 'currentPage': currentPage, 'count': paginatedResult.length, data: paginatedResult };
}

export const searchBooks = async (currentPage, searchQuery) => {
    const result = await client.query(`SELECT * FROM books where LOWER(title) like LOWER('%${searchQuery}%') or LOWER(description) like LOWER('%${searchQuery}%') or LOWER(author) like LOWER('%${searchQuery}%');`);

    const paginatedResult = result.rows.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return { 'totalPage': Math.ceil(result.rowCount / ITEM_PER_PAGE), 'currentPage': currentPage, 'count': paginatedResult.length, data: paginatedResult };
}

export const filterBooks = async (currentPage, filterBooks, sortBy) => {
    const result = await client.query(`SELECT * FROM books where genre = '${filterBooks}';`);

    const sortedResult = SortBooks(result.rows, sortBy);

    const paginatedResult = sortedResult.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return { 'totalPage': Math.ceil(result.rowCount / ITEM_PER_PAGE), 'currentPage': currentPage, 'count': paginatedResult.length, data: paginatedResult };
}

export const addBooks = async (book) => {

    if (!book.genre) {
        book.genre = '';
    }

    const insertQuery = `INSERT INTO books (title,description,author,photo_url,genre) values('${book.title}', '${book.description}', '${book.author}', '${book.photo_url}', '${book.genre}');`;

    await client.query(insertQuery);
}

export const updateBooks = async (id, book) => {

    if (UUID_REGEX.test(id) === false) {
        throw new BookError(404, 'Book not found');
    }

    const bookDetail = await client.query(`select * from books where id='${id}'`);

    if (bookDetail.rowCount === 0) {
        throw new BookError(404, 'Book not found');
    }

    const updatedDetails = bookDetail.rows[0];

    if (book.title) {
        updatedDetails.title = book.title;
    }

    if (book.author) {
        updatedDetails.author = book.author;
    }

    if (book.description) {
        updatedDetails.description = book.description;
    }

    if (book.photo_url) {
        updatedDetails.photo_url = book.photo_url;
    }

    if (book.genre) {
        updatedDetails.genre = book.genre;
    }

    await client.query(`update books set title = '${updatedDetails.title}', author = '${updatedDetails.author}', description = '${updatedDetails.description}', photo_url = '${updatedDetails.photo_url}', modified_date = now(), genre = '${updatedDetails.genre}' where id='${id}';`)

    return { 'success': true, 'message': 'book details updated successfully' };
}

export const deleteBooks = async (id) => {

    if (UUID_REGEX.test(id) === false) {
        throw new BookError(404, 'Book not found');
    }

    const bookDetail = await client.query(`select * from books where id='${id}'`);

    if (bookDetail.rowCount === 0) {
        throw new BookError(404, 'Book not found');
    }

    await client.query(`delete from books where id = '${id}'`)

    return { 'success': true, 'message': `book with title ${bookDetail.rows[0].title} deleted successfully` };
}

export const getBookById = async (id) => {
    if (UUID_REGEX.test(id) === false) {
        throw new BookError(404, 'Book not found');
    }

    const bookDetail = await client.query(`select * from books where id='${id}'`);

    if (bookDetail.rowCount === 0) {
        throw new BookError(404, 'Book not found');
    }

    return bookDetail.rows[0];
}