import express from 'express';
import cors from 'cors';
import {
  addBookToCollection,
  getBookFromCollection,
  getBooksFromCollection,
} from './database.js';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.listen(8080, () => {
  console.log("collection-service listening on port 8080");
});

app.get('/collection/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  const entries = await getBooksFromCollection(user_id);
  res.json(entries);
});

app.get('/collection/:user_id/:book_id', async (req, res) => {
  const { user_id, book_id } = req.params;
  const entry = await getBookFromCollection(user_id, book_id);
  res.status(201).send(entry);
});

app.post('/collection/:user_id/:book_id', async (req, res) => {
  const { user_id, book_id, price, note } = req.body;
  const entry = await addBookToCollection(user_id, book_id, price, note);
  res.status(201).send(entry);
});
