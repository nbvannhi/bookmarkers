import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  ImageListItem,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { URL_BOOK_SVC, URL_COLLECTION_SVC } from '../configs.js';

const AddBook = () => {
  const [entry, setEntry] = useState({ price: 0, note: '' });
  const [book, setBook] = useState([]);
  const { user_id, book_id } = useParams();

  const handleChange = (e) => {
    setEntry((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    addBookToCollection();
  };

  const addBookToCollection = async () => {
    try {
      const res = await axios.post(`${URL_COLLECTION_SVC}/${user_id}/${book_id}`);
      console.log(res);
      alert('Book added to collection.');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchBook = async (id) => {
      try {
        const res = await axios.get(`${URL_BOOK_SVC}/${id}`);
        setBook(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBook(book_id);
  }, [user_id, book_id]);

  return (
    <div>      
      <form onSubmit={handleSubmit}>
          <Box
          sx={{
            maxWidth: 500,
            paddingY: 10,
            alignContent: 'center',
            align: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <ImageListItem key={book.cover}>
            <img
              src={`${book.cover}?w=248&fit=crop&auto=format`}
              srcSet={`${book.cover}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={book.title}
              loading="lazy"
            />
          </ImageListItem>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              alignSelf: 'center'
            }}
          >
            {book.title}
          </Typography>
          <TextField
            name='Price'
            onChange={handleChange}
            value={entry.price}
            variant='outlined'
            placeholder='Price'
            margin='normal'
            sx={{
              width: 300,
              alignSelf: 'center'
            }}
          />
          <TextField
            name='Note'
            onChange={handleChange}
            value={entry.note}
            variant='outlined'
            placeholder='Note'
            margin='normal'
            sx={{
              width: 300,
              alignSelf: 'center'
            }}
          />
          <Button
            variant='contained'
            disableElevation
            type='submit'
            sx={{
              width: 300,
              alignSelf: 'center',
              marginTop: 2
            }}
          >
            Add to Collection
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default AddBook;
