import * as jsonServer from "../connection/json-server.js";
import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";

export const getAllBooks = async () => {
   try {
       const data = await jsonServer.getBooks();  
       if (!data) {
           return {
            title: "Load All Data",
            message: "Data Not Found",
           }
       }
   } 
   catch (err) {
    console.log(`Error while load all books data: ${err}`);
   }
} 


// export const getBookById = async (id) => {
//     try {
//         const data = await jsonServer.getOneBook(id);
        
//     }   
//     catch {

//     }
// }