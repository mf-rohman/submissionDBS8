import * as jsonServer from "../connection/json-server.js";
import {v4 as uuidv4} from "uuid";
import dayjs from "dayjs";

export const getAllBooks = () => jsonServer.getBooks();

export const 