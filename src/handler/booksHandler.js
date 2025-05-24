import * as booksService from "../service/books.service.js";

export const getAllBooksHandler = async (req, h) => {
    const dataAllBooks = await booksService.getAllBooks();
    if (!dataAllBooks) {
        return h.response(dataAllBooks).code(404);
    }
    return h.response(dataAllBooks).code(200);
}