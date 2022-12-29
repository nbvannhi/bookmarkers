import NavBar from './components/nav-bar';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import User from './pages/user';
import ViewAllBooks from './pages/view-all-books';
import ViewBook from './pages/view-book';
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import ViewAllChats from './pages/view-all-chats';

function App() {
  const isSignedIn = useSelector((state) => state.isSignedIn) || localStorage.getItem('userId') != null;
  return (
    <React.Fragment>
      <div className='app'>
        <NavBar />
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/books' element={<ViewAllBooks />} />
          <Route path='/books/:book_id' element={<ViewBook />} />

          { /* protected routes*/}
          {isSignedIn && <Route path='/user' element={<User />} />}{' '}
          {isSignedIn && <Route path='/chats' element={<ViewAllChats />} />}{' '}
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
