import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Books from './pages/books.js'
import './style.css'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/books' element={<Books/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
