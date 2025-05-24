import fetch from "node-fetch";
import dotenv from "dotenv/config";

const { BASE_URL } = process.env;

export const getBooks = async () => {
    const response = await fetch(`${BASE_URL}/books`);
    const data = await response.json();
    return data;
}


export const getBookById = async (id) => {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
}

export const addBooks = async (book) => {
    const response = await fetch(`${BASE_URL}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    const data = await response.json();
    return data;
}

export const updateBook = async (id, book) => {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
    });
    const data = await response.json();
    return data;
}

export const deleteBook = async (id) => {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}
