import {Book} from '../../interfaces/book.interface';
import BookModel from '../../models/book.model';

const getAllBooksService = async () => {
    const books = await BookModel.find();
    return books;
}
const getBookByIsbnService = async (isbn:string) => {
    const book = await BookModel.findOne({isbn});
    return book;
}

const createBookService = async (book:Book) => {
    const checkIs = await BookModel.findOne({isbn: book.ISBN});
    if(checkIs){
        return {message: "Book already exists"}
    }
    if(book.title == "" || book.author == "" || book.ISBN == "" || book.genre == ""){
        return {message: "All fields are required"}
    }
    const newBook = await BookModel.create(book);
    return {message: "Book created successfully", newBook}
}
const updateBookService = async (isbn:string, book:Book) => {
    const checkIs = await BookModel.findOne({isbn});
    if(!checkIs){
        return {message: "Book not found"}
    }
    const updatedBook = await BookModel.findOneAndUpdate({ISBN:isbn, book});
    return {message: "Book updated successfully", updatedBook}
}
const deleteBookService = async (isbn:string) => {
    const checkIs = await BookModel.findOneAndDelete({isbn});
    if(!checkIs){
        return {message: "Book not found"}
    }
    return {message: "Book deleted successfully"}    
}

export {getAllBooksService, getBookByIsbnService, createBookService, updateBookService, deleteBookService}