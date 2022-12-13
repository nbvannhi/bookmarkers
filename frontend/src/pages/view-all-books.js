import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_BOOK_SVC } from '../configs.js'
import ResponsiveAppBar from '../components/app-bar.js'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(URL_BOOK_SVC)
        setBooks(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchBooks()
  }, [])

  return (
    <Box sx={{ width: 1920, height: 1080 }}>
    <ResponsiveAppBar/>
    <Box sx={{ paddingTop: 10, paddingX: 50, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={4} gap={10}>
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

export default Books
