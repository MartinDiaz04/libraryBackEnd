import { Schema, model } from 'mongoose';
import { Book } from '../interfaces/book.interface';
import mongoose from 'mongoose';

const mongooseSequence = require('mongoose-sequence')(mongoose);

const BookSchema = new Schema<Book>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ISBN: { type: String, required: true },
  year: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
});

BookSchema.plugin(mongooseSequence, { inc_field: 'id' });

const BookModel = model('Book', BookSchema);
export default BookModel;
