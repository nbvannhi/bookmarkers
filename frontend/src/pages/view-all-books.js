import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_VIEW_ALL_BOOK } from '../configs.js'
import NavBar from '../components/nav-bar.js'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

const ViewAllBook = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(URL_VIEW_ALL_BOOK)
        setBooks(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchBooks()
  }, [])

  return (
    <Box sx={{ width: 1080, height: 1080 }}>
    <NavBar/>
    <Box sx={{ paddingTop: 10, paddingX: 0, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={5} gap={10}>
        {books.map((book) => (
          <ImageListItem key={book.cover}>
            <img
              src={`${book.cover}?w=248&fit=crop&auto=format`}
              srcSet={`${book.cover}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={book.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </Box>
  )
}

export default ViewAllBook
