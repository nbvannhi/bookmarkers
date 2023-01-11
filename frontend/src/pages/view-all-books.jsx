import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_BOOK_SVC } from '../configs.js';
import {
  Box,
  ImageList,
  ImageListItem,
} from '@mui/material';

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(URL_BOOK_SVC);
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Box sx={{ width: 1080, height: 1080 }}>
      <Box sx={{ paddingY: 10, overflowY: 'scroll' }}>
        <ImageList variant='masonry' cols={5} gap={10} style={{align: 'center'}}>
          {books.map((book) => (
            <a key={book.book_id} href={`books/${book.book_id}`} width='flex'>
              <ImageListItem key={book.book_id}>
                <img
                  src={`${book.cover}?w=248&fit=crop&auto=format`}
                  srcSet={`${book.cover}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={book.title}
                  loading='lazy'
                >
                </img>
              </ImageListItem>
            </a>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}

export default ViewAllBooks;
