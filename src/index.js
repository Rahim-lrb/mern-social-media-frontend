import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/authContext';
import { PostProvider } from './contexts/postsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  </React.StrictMode>
);


