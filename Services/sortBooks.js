import { SORT_BY } from "../utils/enum/sortBy.js";

export const SortBooks = (book, sortBy) => {
    
    if (sortBy && Object.values(SORT_BY).indexOf(sortBy) !== -1) {

        if (sortBy === SORT_BY.TITLE_ASC) {
            return book.sort((book1, book2) => book1.title.localeCompare(book2.title));
        }
        else if (sortBy === SORT_BY.TITLE_DESC) {
            return book.sort((book1, book2) => book2.title.localeCompare(book1.title));
        }
        else if (sortBy === SORT_BY.DATE_ADDED) {
            return book.sort((book1, book2) => {
                const date1 = Date.parse(book1.added_date);
                const date2 = Date.parse(book2.added_date);
                
                return date2 - date1;
            });
        }

    }
    return book;
}