import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_BOOK_SVC, URL_COLLECTION_SVC } from '../configs.js';
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const ViewBook = () => {
  const [book, setBook] = useState([]);
  const [entry, setEntry] = useState({});
  const [inCollection, setInCollection] = useState(false);
  const { book_id } = useParams();
  const user_id = localStorage.getItem('userId');

  const fetchBook = async (id) => {
    try {
      const res = await axios.get(`${URL_BOOK_SVC}/${id}`);
      setBook(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchEntry = async (id) => {
    try {
      const res = await axios.get(`${URL_COLLECTION_SVC}/${user_id}/${id}`);
      setEntry(res.data[0]);
      if (Object.keys(entry).length !== 0) {
        setInCollection(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchBook(book_id);
    fetchEntry(book_id);
    // eslint-disable-next-line
  }, [book_id, JSON.stringify(entry)]);

  return (
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
          alignSelf: 'center',
          marginTop: 3,
        }}
      >
        {book.title}
      </Typography>
      {inCollection &&
        <>
          <Typography
            variant='h6'
            noWrap
            component='a'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
              alignSelf: 'center',
              marginTop: 3,
            }}
          >
            Price: {entry.price}
          </Typography>
          <Typography
          variant='h6'
          noWrap
          component='a'
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            color: 'inherit',
            textDecoration: 'none',
            alignSelf: 'center',
            marginTop: 3,
          }}
        >
          Note: {entry.note}
        </Typography>
        </>
      }
      <Button
        variant='contained'
        disableElevation
        href={`http://localhost:3000/collection/${user_id}/${book_id}`}
        sx={{
          width: 'fit-content',
          alignSelf: 'center',
          marginTop: 3,
        }}
      >
        {inCollection ? "Edit Collection Entry" : "Add to Collection"}
      </Button>
    </Box>
  );
}

export default ViewBook;
