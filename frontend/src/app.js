import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import NavBar from './components/nav-bar.jsx';
import ViewAllBooks from './pages/view-all-books.jsx';
import ViewBook from './pages/view-book.jsx';
import './style.css';

function App() {

  return (
    <div className='app'>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/books' element={<ViewAllBooks/>}/>
          <Route path='/books/:book_id' element={<ViewBook/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
