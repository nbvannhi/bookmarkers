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
  const [book, setBook] = useState([]);
  const [price, setPrice] = useState([]);
  const [note, setNote] = useState([]);
  const { user_id, book_id } = useParams();

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addBookToCollection();
  }

  const fetchBook = async (id) => {
    try {
      const res = await axios.get(`${URL_BOOK_SVC}/${id}`);
      setBook(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const addBookToCollection = async () => {
    console.log(URL_COLLECTION_SVC);
    await axios.post(`${URL_COLLECTION_SVC}/${user_id}/${book_id}`, {
      user_id: user_id,
      book_id: book_id,
      price: price,
      note: note,
    }).catch((err) => console.log(err.response));
    alert('Book added to collection.');
  }

  useEffect(() => {
    fetchBook(book_id);
  }, [user_id, book_id]);

  return (
    <div>      
      <form onSubmit={handleSubmit} method='post'>
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
            onChange={handlePriceChange}
            value={price}
            variant='outlined'
            placeholder='Price'
            margin='normal'
            type='number'
            sx={{
              width: 300,
              alignSelf: 'center'
            }}
          />
          <TextField
            name='Note'
            onChange={handleNoteChange}
            value={note}
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
            type='submit'
            disableElevation
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
