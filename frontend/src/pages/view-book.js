import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_VIEW_ALL_BOOK } from '../configs.js';
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const ViewBook = () => {
  const [book, setBook] = useState([]);
  const { book_id } = useParams();

  useEffect(() => {
    const fetchBook = async (id) => {
      try {
        const res = await axios.get(`${URL_VIEW_ALL_BOOK}/${id}`);
        setBook(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBook(book_id);
  }, [book_id]);

  return (
    <Box
      sx={{
        paddingY: 10,
        alignContent: 'center',
        align: 'center'
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
      <Button>
        Add to Collection
      </Button>
    </Box>
  );
}

export default ViewBook;