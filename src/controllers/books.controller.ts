import { Request, Response } from "express";
import {
  getAllBooksService,
  getBookByIsbnService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/book/book.services";

const getBooks = async (req: Request, res: Response) => {
  try {
    const response = await getAllBooksService();
    res.status(200);
    res.send(response);
  } catch (e) {
    res.status(500);
    res.send("Error");
  }
};
const getBookById = async ({ params }: Request, res: Response) => {
  try {
    const { isbn } = params;
    const response = await getBookByIsbnService(isbn);
    const data = response ? response : "Book not found";
    res.send(data);
  } catch (e) {
    res.status(500);
    res.send("Error");
  }
};

const createBook = async ({ body }: Request, res: Response) => {
  try {
    const response = await createBookService(body);
    if (response.message == "Book created successfully") {
      res.status(201);
      res.send(response);
    }
    if (
      response.message == "Book already exists" ||
      response.message == "All fields are required"
    ) {
      res.status(400);
      res.send(response);
    }
  } catch (e) {
    res.status(500);
    res.send("Error");
  }
};

const updateBook = async ({ params, body }: Request, res: Response) => {
  try {
    const { isbn } = params;
    const response = await updateBookService(isbn, body);
    if (response.message == "Book updated successfully") {
      res.status(200);
      res.send(response);
    }
    if (response.message == "Book not found") {
      res.status(404);
      res.send(response);
    }
  } catch (e) {
    res.status(500);
    res.send("Error");
  }
};

const deleteBook = async ({ params }: Request, res: Response) => {
  try {
    const { isbn } = params;
    const response = await deleteBookService(isbn);
    if (response.message == "Book deleted successfully") {
      res.status(200);
      res.send(response);
    }
    if (response.message == "Book not found") {
      res.status(404);
      res.send(response);
    }
  } catch (e) {
    res.status(500);
    res.send("Error");
  }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
