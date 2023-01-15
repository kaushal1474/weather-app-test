import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";

import FavouritePage from './pages/Favourites';
import SearchPage from './pages/Search';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/favourites" element={<FavouritePage />} />   
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
