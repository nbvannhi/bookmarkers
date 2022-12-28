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
  WHERE collection_id = ?
  `, [user_id]);
  return collection;
}

export async function createCollection(user_id) {
  const [collection] = await pool.query(`
  INSERT INTO collections (user_id) VALUES (?)
  `, [user_id]);
  const collection_id = collection.insertId;
  return getCollection(user_id);
}

export async function editCollection(user_id, book_id, price, note) {
  const collection_id = getCollection(user_id).collection_id;
  if (collection_id === NULL) {
    createCollection(user_id);
  }
  const [collection_book] = await pool.query(`
  INSERT INTO collection_books (collection_id) VALUES (?, ?, ?)
  `, [book_id, price, note]);
  return collection_book;
}
