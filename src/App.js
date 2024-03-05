import './App.css';
import { Helmet } from 'react-helmet';
import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/authContext';

import Welcome from './pages/Welcome';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Error from './pages/Error';

import LoadingBar from 'react-top-loading-bar'


function App() {
  const { currentUser } = useContext(UserContext);
  const [ progress, setProgress ] = useState(0)


  return (
    <div className="App h-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>wex-media</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      
      <Navbar/>
      <LoadingBar color='#3b82f6' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Routes>
        {/* <Route path="/"  element={<Welcome></Welcome>} />
        <Route path="/"  element={currentUser ? <Home setProgress={setProgress}/> : <Navigate to="/login" />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!currentUser ? <Login/> : <Navigate to="/" />} />
        <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to="/" />} /> */}
        <Route path="/" element={currentUser ? <Navigate to="/home" /> : <Welcome />} />
        <Route path="/home"  element={currentUser ? <Home setProgress={setProgress}/> : <Navigate to="/login" />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!currentUser ? <Login/> : <Navigate to="/home" />} />
        <Route path="/signup" element={!currentUser ? <SignUp /> : <Navigate to="/home" />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
