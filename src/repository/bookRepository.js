import books from '../db/db.js';

const addBook = (book) => {
    books.push(book);
}

const getAllBooks = () => books;

const getBookById = (id) => books.find((book) => book.id === id);

const updateBookById = (id, updatedBook) => {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...updatedBook };
        return books[index];
    }
    return null;
};

const deleteBookById = (id) => {
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        return books.splice(index, 1)[0];
    }
    return null;
}

export {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}