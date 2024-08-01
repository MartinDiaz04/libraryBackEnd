import { Book } from '../../interfaces/book.interface';
import BookModel from '../../models/book.model';

const getAllBooksService = async () => {
  try {
    const books = await BookModel.find();
    return books;
  } catch (error) {
    throw new Error('Error fetching all books');
  }
}

const getBookByIdService = async (id: number) => {
  try {
    const book = await BookModel.findOne({ id });
    return book;
  } catch (error) {
    throw new Error('Error fetching book by ID');
  }
}

const createBookService = async ({ title, description, ISBN, year }: Book) => {
  try {
    const checkIs = await BookModel.findOne({ ISBN });
    if (checkIs) {
      return { message: "Book already exists" };
    }
    if (title === "" || ISBN === "") {
      return { message: "All fields are required" };
    }
    const newBook = await BookModel.create({ title, description, ISBN, year });
    return { message: "Book created successfully", newBook };
  } catch (error) {
    throw new Error('Error creating book');
  }
}

const updateBookService = async (id: number, book: Book) => {
  try {
    const checkIs = await BookModel.findOne({ id });
    if (!checkIs) {
      return { message: "Book not found" };
    }
    const updatedBook = await BookModel.findOneAndUpdate({ id }, book, { new: true });
    return { message: "Book updated successfully", updatedBook };
  } catch (error) {
    throw new Error('Error updating book');
  }
}

const deleteBookService = async (id: number) => {
  try {
    const checkIs = await BookModel.findOneAndDelete({ id });
    if (!checkIs) {
      return { message: "Book not found" };
    }
    return { message: "Book deleted successfully" };
  } catch (error) {
    throw new Error('Error deleting book');
  }
}

export { getAllBooksService, getBookByIdService, createBookService, updateBookService, deleteBookService };
