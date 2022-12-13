import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import ViewAllBooks from './pages/view-all-books.js'
import './style.css'

function app() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/book/all' element={<ViewAllBooks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default app
