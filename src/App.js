import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useContext } from 'react';
import { UserContext } from './contexts/authContext';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import ShowNavBar from './components/ShowNavBar';
import Error from './pages/Error';
import Profile from './pages/Profile';

import LoadingBar from 'react-top-loading-bar'


function App() {
  const { currentUser } = useContext(UserContext);
  const [ progress, setProgress ] = useState(0)


  return (
    <div className="App h-full">
      <ShowNavBar>
        <Navbar></Navbar>
      </ShowNavBar>
      {/* <Navbar /> */}
      <LoadingBar color='#3b82f6' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Routes>

        <Route path="/"  element={currentUser ? <Home setProgress={setProgress}/> : <Navigate to="/login" />} />
        {/* <Route path="/profile" element={<Profile />}/> */}
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!currentUser ? <Login/> : <Navigate to="/" />} />
        <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to="/" />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
