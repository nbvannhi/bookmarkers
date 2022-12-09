CREATE DATABASE book_db;
USE book_db;

CREATE TABLE publishers (
  publisher_id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
)

CREATE TABLE authors (
  author_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
)

CREATE TABLE books (
  book_id SERIAL,
  isbn VARCHAR(13) UNIQUE NOT NULL,
  title VARCHAR(50) NOT NULL,  
  edition VARCHAR(10) NULL,
  publisher_id INTEGER NOT NULL,
  published_date DATE NOT NULL,
  PRIMARY KEY(book_id),
  CONSTRAINT fk_publisher
    FOREIGN KEY(publisher_id)
    REFERENCES publishers(publisher_id),
  CONSTRAINT fk_series
    FOREIGN KEY(series_id)
    REFERENCES series(series_id),
)

CREATE TYPE series_status AS ENUM (
  'on_going',
  'complete'
)

CREATE TABLE series (
  series_id SERIAL,
  status series_status,
  length INTEGER NOT NULL,
  PRIMARY KEY(series_id)
)

CREATE TABLE book_series (
  book_id INTEGER NOT NULL,
  series_id INTEGER NOT NULL,
  PRIMARY KEY(book_id, series_id),
  CONSTRAINT fk_book
    FOREIGN KEY(book_id)
    REFERENCES books(book_id) ON DELETE CASCADE,
  CONSTRAINT fk_series
    FOREIGN KEY(series_id)
    REFERENCES series(series_id) ON DELETE CASCADE
)

CREATE TABLE book_authors (
  book_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  PRIMARY KEY(book_id, author_id),
  CONSTRAINT fk_book
    FOREIGN KEY(book_id)
    REFERENCES books(book_id) ON DELETE CASCADE,
  CONSTRAINT fk_author
    FOREIGN KEY(author_id)
    REFERENCES authors(author_id) ON DELETE CASCADE
)
