import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import ViewAllBooks from './pages/view-all-books.js'
import './style.css'

function App() {

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/books' element={<ViewAllBooks/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
