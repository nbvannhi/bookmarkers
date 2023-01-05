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
  const collection_id = collection[0] ? collection[0].collection_id : null;
  return [collection[0], collection_id];
}

export async function createCollection(user_id) {
  const [collection] = await pool.query(`
  INSERT INTO collections (user_id) VALUES (?)
  `, [user_id]);
  const collection_id = collection.insertId;
  return [collection, collection_id];
}

export async function getCollectionEntries(user_id) {
  let collection = await getCollection(user_id);
  if (!collection[0]) {
    return null;
  }
  const collection_id = collection[1];
  const [entries] = await pool.query(`
  SELECT *
  FROM collection_books
  WHERE collection_id = ?
  `, [collection_id]);
  return entries;
}

export async function getCollectionEntry(user_id, book_id) {
  let collection = await getCollection(user_id);
  if (!collection[0]) {
    return null;
  }
  const collection_id = collection[1];
  const [entry] = await pool.query(`
  SELECT *
  FROM collection_books
  WHERE collection_id = ? AND book_id = ?
  `, [collection_id, book_id]);
  return entry;
}

export async function checkCollectionEntry(collection_id, book_id) {
  const [entry] = await pool.query(`
  SELECT *
  FROM collection_books
  WHERE collection_id = ? AND book_id = ?
  `, [collection_id, book_id]);
  return entry !== null;
}

export async function updateCollectionEntry(user_id, book_id, price, note) {
  let collection = await getCollection(user_id);
  if (!collection[0]) {
    console.log('creating new collection for user...');
    collection = await createCollection(user_id);
  }
  const collection_id = collection[1];
  const inCollection = collection[0]
    ? checkCollectionEntry(collection_id, book_id) : false;
  return inCollection
    ? editCollectionEntry(collection_id, book_id, price, note)
    : addCollectionEntry(collection_id, book_id, price, note);
}

export async function addCollectionEntry(collection_id, book_id, price, note) {
  const [entry] = await pool.query(`
  INSERT INTO collection_books (collection_id, book_id, price, note) VALUES (?, ?, ?, ?)
  `, [collection_id, book_id, price, note]);
  return entry;
}

export async function editCollectionEntry(collection_id, book_id, price, note) {
  const [entry] = await pool.query(`
  UPDATE collection_books
  SET price = ?, note = ?
  WHERE collection_id = ? AND book_id = ?
  `, [price, note, collection_id, book_id]);
  return entry;
}
