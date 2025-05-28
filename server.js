import init from "./src/app.js";

init()
    .then(server  => {
        server.start();
        console.log(`Server running on ${server.info.uri}`);  
    })
    .catch(err => {
        console.error('Error starting server:', err);
    }); 