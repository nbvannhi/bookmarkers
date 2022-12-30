import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { URL_BOOK_SVC } from '../configs';

const ViewCollection = () => {
  const [collection, setCollection] = useState([]);
  const [books, setBooks] = useState([]);
  const { user_id } = useParams();

  const fetchCollection = async (user_id) => {
    try {
      const res = await axios.get(`${URL_BOOK_SVC}/${user_id}`);
      setCollection(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchBooks = async (collection) => {
    try {
      for (let cid; cid < collection.length; cid++) {
        const bid = collection[cid].book_id;
        const res = await axios.get(`${URL_BOOK_SVC}/${bid}`);
        setBooks(books => [...books, res.data[0]]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCollection(user_id);
    fetchBooks(collection);
  }, [user_id]);

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

export default ViewCollection;
