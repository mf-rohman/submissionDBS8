import { addBookHandler, getAllBooksHandler, getAllBooksByIdHandler, updateBookByIdHandler, deleteBookByIdHandler } from "../handler/booksHandler.js";

const booksRoutes = [
    { method: 'POST', path: '/books', handler: addBookHandler },
    { method: 'GET', path: '/books', handler: getAllBooksHandler },
    { method: 'GET', path: '/books/{id}', handler: getAllBooksByIdHandler },
    { method: 'PUT', path: '/books/{id}', handler: updateBookByIdHandler },
    { method: 'DELETE', path: '/books/{id}', handler: deleteBookByIdHandler },    
]

export default booksRoutes;