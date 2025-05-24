import { createServer } from "./src/app.js";


const init = async () => {
    const server = await createServer();
    await server.start();

    console.log(`Server running on ${server.info.uri}`);
}

init();
