import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_BOOK_SVC } from '../configs.js'

const ViewAllBooks = () => {

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
  }, []);

  return (
    <div>
      <h1>Booksmarkers Resources</h1>
      <div className='books'>
        {books.map(book => (
          <div className='book' key={book.book_id}>
            {book.cover && book.title && <img src={book.cover} alt={book.title} />}
            <p>{book.title}</p>
            <p>{book.isbn13}</p>
          </div>
        ))}
      </div>
    </div >
  )
}

export default ViewAllBooks
