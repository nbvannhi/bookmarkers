import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

export async function getPublishers() {
  const [publishers] = await pool.query("SELECT * FROM publishers");
  return publishers;
}

export async function getPublisher(id) {
  const [publisher] = await pool.query(`
  SELECT *
  FROM publishers
  WHERE publisher_id = ?
  `, [id]);
  return publisher;
}

export async function createPublisher(name) {
  const [publisher] = await pool.query(`
  INSERT INTO publishers (name) VALUES (?)
  `, [name])
  const id = publisher.insertId;
  return getPublisher(id);
}

export async function getBooks() {
  const [books] = await pool.query(`SELECT * FROM books`);
  return books;
}

export async function getBook(id) {
  const [book] = await pool.query(`
  SELECT *
  FROM books
  WHERE book_id = ?
  `, [id]);
  return book;
}
