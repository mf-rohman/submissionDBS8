import Hapi from "@hapi/hapi";
import { getAllBooksHandler } from "./handler/booksHandler.js";
// import booksRoutes from "./routes/booksRoutes.js";

export const createServer = async () => {
    const server = Hapi.server({
        port : 9000,
        host : "localhost",
    });
    // console.log({booksRoutes});
    server.route({
        method: "GET",
        path: "/books",
        handler: getAllBooksHandler
    });
    return server;
}