import express from 'express';
import cors from 'cors';
import {
  getPublishers, getPublisher, createPublisher,
  getBooks, getBook
} from './database.js';

const app = express();

app.use(express.json())
app.use(cors())

app.get('/publishers', async (req, res) => {
  const publishers = await getPublishers();
  res.json(publishers);
})

app.get('/publishers/:publisher_id', async (req, res) => {
  const id = req.params.publisher_id;
  const publisher = await getPublisher(id);
  res.send(publisher);
})

app.post('/publishers', async (req, res) => {
  const { name } = req.body;
  const publisher = await createPublisher(name);
  res.status(201).send(publisher);
})

app.get('/books', async (req, res) => {
  const books = await getBooks();
  res.json(books);
})

app.get('/books/:book_id', async (req, res) => {
  const id = req.params.book_id;
  const book = await getBook(id);
  res.send(book);
})

app.listen(8000, () => {
  console.log("book-service listening on port 8000");
})
