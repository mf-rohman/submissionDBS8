import { v4 as uuidv4 } from 'uuid';
import * as bookRepository from '../repository/bookRepository.js';
import { validateBook } from '../service/books.service.js';

const addBookHandler = (req, h) => {
    try {
        validateBook(req.payload);
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
        const id = uuidv4();
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = pageCount === readPage;


        bookRepository.addBook({
            id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
        });

        return h.response({
            status: 'success',
            message: 'Book added successfully',
            data: { bookId: id }
        }).code(201);
    }
    catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(400);
    }
}

const getAllBooksHandler = (req, h) => {
    const { finished } = req.query;
    let books = bookRepository.getAllBooks()
    console.log({ books });
    if (finished == 1) {
        books = books.filter((book) => {
            return book.finished == finished
        })
            .map(({ id, name, publisher }) => ({ id, name, publisher }));
    } else if (finished == 0) {
        books = books.map(({ id, name, publisher }) => ({ id, name, publisher, }));
        books.push({ id: 'id', name: 'name', publisher: 'publisher' });
    } else {
        books = books.map(({ id, name, publisher }) => ({ id, name, publisher, }));
    }

    return h.response({
        status: 'success',
        data: { books },
    }).code(200);
}

const getAllBooksByIdHandler = (req, h) => {
    const { id } = req.params;
    const book = bookRepository.getBookById(id);

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Book Not Found'
        }).code(404);
    }
    return h.response({
        status: 'success',
        data: { book }
    }).code(200);
}

const updateBookByIdHandler = (req, h) => {
    try {
        validateBook(req.payload);
        const { id } = req.params;
        const updateExistingBook = bookRepository.updateBookById(id, req.payload);

        if (!updateExistingBook) {
            return h.response({
                status: 'fail',
                message: 'Book not found'
            }).code(404);
        }

        const updateAt = new Date().toISOString();
        const finished = updateExistingBook.pageCount === updateExistingBook.readPage;

        const _update = bookRepository.updateBookById(id, { ...updateExistingBook, updateAt, finished });
        return h.response({
            status: 'success',
            message: 'Book updated successfully',
            data: { book: updateExistingBook }
        }).code(200);
    }
    catch (error) {
        return h.response({
            status: 'fail',
            message: error.message
        }).code(400);
    }
}

const deleteBookByIdHandler = (req, h) => {
    const { id } = req.params;
    const deletedBook = bookRepository.deleteBookById(id);

    if (!deletedBook) {
        return h.response({
            status: 'fail',
            message: 'Book not found'
        }).code(404);
    }
    return h.response({
        status: 'success',
        message: 'Book deleted successfully'
    }).code(200);
}

export {
    addBookHandler,
    getAllBooksHandler,
    getAllBooksByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler
};