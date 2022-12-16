import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import User from './pages/user';
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

function App() {
  const isSignedIn = useSelector((state) => state.isSignedIn) || localStorage.getItem('isSignedIn');
  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {isSignedIn && <Route path="/user" element={<User />} />}{' '}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
