DROP DATABASE IF EXISTS collection_db;
CREATE DATABASE collection_db;
USE collection_db;

CREATE TABLE collections (
  collection_id SERIAL PRIMARY KEY,
  user_id VARCHAR(256) UNIQUE NOT NULL
);

CREATE TABLE collection_books (
  collection_id BIGINT UNSIGNED NOT NULL,
  book_id BIGINT UNSIGNED NOT NULL,
  price INTEGER UNSIGNED NULL,
  note TEXT NULL,
  PRIMARY KEY(collection_id, book_id),
  FOREIGN KEY(collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE
);
