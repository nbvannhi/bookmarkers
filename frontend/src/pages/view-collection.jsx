import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_BOOK_SVC, URL_COLLECTION_SVC } from '../configs';
import {
  Box,
  ImageList,
  ImageListItem,
} from '@mui/material';

const ViewCollection = () => {
  const [collection, setCollection] = useState([]);
  const [books, setBooks] = useState([]);
  const user_id = localStorage.getItem('userId');

  const fetchCollection = async (user_id) => {
    try {
      const res = await axios.get(`${URL_COLLECTION_SVC}/${user_id}`);
      setCollection(res.data);
      fetchBooks(collection);
  } catch (err) {
      console.log(err);
    }
  };

  const fetchBooks = async (collection) => {
    try {
      for (let cid = 0; cid < collection.length; cid++) {
        const bid = collection[cid].book_id;
        const res = await axios.get(`${URL_BOOK_SVC}/${bid}`);
        setBooks(books => [...books, res.data[0]]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCollection(user_id);
    // eslint-disable-next-line
  }, [user_id, JSON.stringify(collection)])

  return (
    <Box sx={{ width: 1080, height: 1080 }}>
      <Box sx={{ paddingY: 10, overflowY: 'scroll' }}>
        <ImageList variant='masonry' cols={5} gap={10} style={{align: 'center'}}>
          {books.map((book) => (
            <a key={book.book_id} href={`http://localhost:3000/books/${book.book_id}`} width='flex'>
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

export default ViewCollection;
