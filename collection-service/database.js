import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

export async function getCollection(user_id) {
  const [collection] = await pool.query(`
  SELECT *
  FROM collections
  WHERE user_id = ?
  `, [user_id]);
  const collection_id = collection[0] ? collection[0].collection_id : null
  return collection_id;
}

export async function createCollection(user_id) {
  const [collection] = await pool.query(`
  INSERT INTO collections (user_id) VALUES (?)
  `, [user_id]);
  const collection_id = collection.insertId;
  return collection_id;
}

export async function addBookToCollection(user_id, book_id, price, note) {
  let collection_id = await getCollection(user_id);
  if (!collection_id) {
    console.log('creating new collection for user...');
    collection_id = await createCollection(user_id);
  }
  const [entry] = await pool.query(`
  INSERT INTO collection_books (collection_id, book_id, price, note) VALUES (?, ?, ?, ?)
  `, [collection_id, book_id, price, note]);
  return entry;
}
