import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";

import FavouritePage from './pages/Favourites';
import SearchPage from './pages/Search';
import './App.css';
import Layout from './component/Layout';
import { IContext, IFavouriteCity } from './types';

export const Context = createContext<IContext>({
  favouriteCity: null,
  setFavouriteCity: () => { }
})

function App() {
  const [favouriteCity, setFavouriteCity] = useState<IFavouriteCity | null>(null)

  return (
    <BrowserRouter>
      <Context.Provider value={{ favouriteCity, setFavouriteCity }}>
        <Layout>
          <Routes>
            <Route path="/favourites" element={<FavouritePage />} />
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </Layout>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
