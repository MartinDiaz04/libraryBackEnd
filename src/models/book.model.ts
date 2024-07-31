import {Schema, Types, model, Model} from 'mongoose'
import {Book} from '../interfaces/book.interface'

const BookSchema = new Schema<Book>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    ISBN: {type: String, required: true},
    year: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const BookModel = model('Book', BookSchema)
export default BookModel