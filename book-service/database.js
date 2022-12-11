import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getPublishers() {
  const [result] = await pool.query("SELECT * FROM publishers")
  return result;
}

export async function getPublisher(id) {
  const [result] = await pool.query(`
  SELECT *
  FROM publishers
  WHERE publisher_id = ?
  `, [id])
  return result
}

export async function createPublisher(name) {
  const [result] = await pool.query(`
  INSERT INTO publishers (name) VALUES (?)
  `, [name])
  const id = result.insertId
  return getPublisher(id)
}
