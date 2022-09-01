import { client } from "../server.js"


const UUID_REGEX = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

export const getBook = async (currentPage) => {
    const ITEM_PER_PAGE = 5;

    const result = await client.query(`SELECT * FROM books;`);
    
    const paginatedResult = result.rows.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    
    return {'totalPage': Math.ceil(result.rowCount/ITEM_PER_PAGE), 'currentPage': currentPage,'count': paginatedResult.length, data: paginatedResult};
}

export const addBook = async (book) => {

    const insertQuery = `INSERT INTO books (title,description,author,photo_url) values('${book.title}', '${book.description}', '${book.author}', '${book.photo_url}');`;

    await client.query(insertQuery);
}

export const updateBook = async (id, book) => {

    if(UUID_REGEX.test(id) === false){
        return {success: false, message: 'Book not found'};
    }

    const userDetail = await client.query(`select * from books where id='${id}'`);

    if (userDetail.rowCount === 0) {
        return { success: false, message: 'Book not found' };
    }

    const updatedDetails = userDetail.rows[0];

    if (book.title) {
        updatedDetails.title = book.title;
    }

    if (book.author) {
        updatedDetails.author = book.author;
    }

    if (book.description) {
        updatedDetails.description = book.description;
    }

    if(book.photo_url){
        updatedDetails.photo_url = book.photo_url;
    }

    await client.query(`update books set title = '${updatedDetails.title}', author = '${updatedDetails.author}', description = '${updatedDetails.description}', photo_url = '${updatedDetails.photo_url}' where id='${id}';`)

    return { 'success': true, 'message': 'book details updated successfully' };
}

export const deleteBook = async (id) => {

    if(UUID_REGEX.test(id) === false){
        return {success: false, message: 'Book not found'};
    }

    const userDetail = await client.query(`select * from books where id='${id}'`);

    if (userDetail.rowCount === 0) {
        return { success: false, message: 'Book not found' };
    }

    await client.query(`delete from books where id = '${id}'`)

    return { 'success': true, 'message': `book with title ${userDetail.rows[0].title} deleted successfully` };
}