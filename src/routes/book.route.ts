import {Router, Request, Response} from "express";
import {getBooks, getBookByISBN, createBook, updateBook, deleteBook} from "../controllers/books.controller";

const router = Router();


router.get("/books", getBooks);
router.get("/books/:ISBN", getBookByISBN);  
router.post("/books", createBook);
router.put("/books/:ISBN", updateBook);
router.delete("/books/:ISBN", deleteBook);



export default router