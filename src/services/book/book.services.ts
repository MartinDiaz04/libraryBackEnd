import {Book} from '../../interfaces/book.interface';
import BookModel from '../../models/book.model';

const getAllBooksService = async () => {
    const books = await BookModel.find();
    return books;
}
const getBookByISBNService = async (isbn:string) => {
    const book = await BookModel.findOne({isbn});
    return book;
}

const createBookService = async ({title, description, ISBN, year}:Book) => {
    const checkIs = await BookModel.findOne({ISBN});
    console.log(checkIs)
    if(checkIs){
        return {message: "Book already exists"}
    }
    if(title == "" ||  ISBN == ""){
        return {message: "All fields are required"}
    }
    const newBook = await BookModel.create({title, description, ISBN, year});
    return {message: "Book created successfully", newBook}
}



const updateBookService = async (isbn: string, book: Book) => {
    const checkIs = await BookModel.findOne({ isbn });
    if (!checkIs) {
        return { message: "Book not found" };
    }
    const updatedBook = await BookModel.findOneAndUpdate({ isbn }, book, { new: true });
    return { message: "Book updated successfully", updatedBook };
}




const deleteBookService = async (isbn:string) => {
    const checkIs = await BookModel.findOneAndDelete({isbn});
    if(!checkIs){
        return {message: "Book not found"}
    }
    return {message: "Book deleted successfully"}    
}

export {getAllBooksService, getBookByISBNService, createBookService, updateBookService, deleteBookService}