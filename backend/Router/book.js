import express from 'express'
import { deleteBook, getAllbook, postbook, updatebook } from '../controller/book.js';


export const bookR = express.Router();

bookR.post('/book',postbook)
bookR.get('/bookAll',getAllbook)
bookR.delete('/:id',deleteBook)
bookR.put('/update/:id',updatebook)
