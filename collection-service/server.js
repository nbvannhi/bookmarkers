import express from 'express';
import cors from 'cors';
import { addBookToCollection, getCollection } from './database.js';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.listen(8080, () => {
  console.log("collection-service listening on port 8080");
});

app.get('/collection/:user_id', async (req, res) => {
  const { user_id } = req.body;
  const collection = await getCollection(user_id)[0];
  res.send(collection);
});

app.post('/collection/:user_id/:book_id', async (req, res) => {
  const { user_id, book_id, price, note } = req.body;
  const entry = await addBookToCollection(user_id, book_id, price, note);
  res.status(201).send(entry);
});