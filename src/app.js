import Hapi from '@hapi/hapi';
import dotenv from 'dotenv/config';
import booksRoutes from './routes/booksRoutes.js';

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 9000,
        host: 'localhost',
    });
    server.route(booksRoutes);
    return server;
}

export default init;