import { v4 as uuidv4 } from 'uuid';
import * as bookRepository from '../repository/bookRepository.js';
import { validateBook } from '../service/books.service.js';

const addBookHandler = (req, h) => {
    try {
        validateBook(req.payload, 'POST');
        const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
        const id = uuidv4();
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const finished = pageCount === readPage;

        bookRepository.addBook({
            id, name, year, author, summary, publisher, pageCount,
            readPage, reading, finished, insertedAt, updatedAt
        });

        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
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
    const { reading, finished, name } = req.query;
    let books = bookRepository.getAllBooks();

    if (reading !== undefined) {
        books = books.filter(book => book.reading == (reading === '1'));
    }
    if (finished !== undefined) {
        books = books.filter(book => book.finished == (finished === '1'));
    }
    if (name) {
        const searchTerm = name.toLowerCase();
        books = books.filter(book =>
            book.name.toLowerCase().includes(searchTerm)
        );
    }

    const responseBooks = books.map(({ id, name, publisher }) => ({ id, name, publisher }));

    return h.response({
        status: 'success',
        data: { books: responseBooks },
    }).code(200);
}

const getAllBooksByIdHandler = (req, h) => {
    const { id } = req.params;
    const book = bookRepository.getBookById(id);

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }
    return h.response({
        status: 'success',
        data: { book }
    }).code(200);
}

const updateBookByIdHandler = (req, h) => {
    try {
        validateBook(req.payload, 'PUT');
        const { id } = req.params;
        const existingBook = bookRepository.getBookById(id);

        if (!existingBook) {
            return h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan'
            }).code(404);
        }

        const updatedAt = new Date().toISOString();
        const finished = req.payload.pageCount === req.payload.readPage;

        const updatedBook = {
            ...existingBook,
            ...req.payload,
            updatedAt,
            finished
        };

        bookRepository.updateBookById(id, updatedBook);

        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
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
    const isDeleted = bookRepository.deleteBookById(id);

    if (!isDeleted) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(404);
    }
    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    }).code(200);
}

export {
    addBookHandler,
    getAllBooksHandler,
    getAllBooksByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler
};


