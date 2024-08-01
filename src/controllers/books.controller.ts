import { Request, Response } from "express";
import {
  getAllBooksService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/book/book.services";

const getBooks = async (req: Request, res: Response) => {
  try {
    const response = await getAllBooksService();
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send("Error fetching books");
  }
};

const getBookById = async ({params}: Request, res: Response) => {
  try {    
    const { id } = params;
    const response = await getBookByIdService(Number(id));
    const data = response ? response : "Book not found";
    res.status(response ? 200 : 404).send(data);
  } catch (e) {
    res.status(500).send("Error fetching book by ID");
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const response = await createBookService(req.body);
    const status = response.message === "Book created successfully" ? 201 : 400;
    res.status(status).send(response);
  } catch (e) {
    res.status(500).send("Error creating book");
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await updateBookService(Number(id), req.body);
    const status = response.message === "Book updated successfully" ? 200 : 404;
    res.status(status).send(response);
  } catch (e) {
    res.status(500).send("Error updating book");
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteBookService(Number(id));
    const status = response.message === "Book deleted successfully" ? 200 : 404;
    res.status(status).send(response);
  } catch (e) {
    res.status(500).send("Error deleting book");
  }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
