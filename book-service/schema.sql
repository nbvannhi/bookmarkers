DROP DATABASE IF EXISTS book_db;
CREATE DATABASE book_db;
USE book_db;

CREATE TABLE publishers (
  publisher_id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE authors (
  author_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  isbn13 VARCHAR(13) UNIQUE NOT NULL,
  title VARCHAR(50) NOT NULL,  
  edition VARCHAR(10) NULL,
  publisher_id BIGINT UNSIGNED NOT NULL,
  publication_date DATE NOT NULL,
  FOREIGN KEY(publisher_id) REFERENCES publishers(publisher_id)
);

CREATE TABLE series (
  series_id SERIAL PRIMARY KEY,
  length INTEGER NOT NULL,
  status VARCHAR(8),
  CHECK (status IN ('on_going', 'complete'))
);

CREATE TABLE book_series (
  book_id BIGINT UNSIGNED NOT NULL,
  series_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(book_id, series_id),
  FOREIGN KEY(book_id) REFERENCES books(book_id) ON DELETE CASCADE,
  FOREIGN KEY(series_id) REFERENCES series(series_id) ON DELETE CASCADE
);

CREATE TABLE book_authors (
  book_id BIGINT UNSIGNED NOT NULL,
  author_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY(book_id, author_id),
  FOREIGN KEY(book_id) REFERENCES books(book_id) ON DELETE CASCADE,
  FOREIGN KEY(author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);
