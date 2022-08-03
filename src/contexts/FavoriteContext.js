import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteContext = createContext();

function FavoriteContextProvider({ children }) {
  // Ids of favorite assets are stored in this array
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (favorite) => {
    if (!favorites.includes(favorite)) {
      setFavorites([...favorites, favorite]);
    }
  };
  const removeFavorite = (favorite) => {
    setFavorites(favorites.filter((f) => f !== favorite));
  };

  const toggleFavorite = (favorite) => {
    if (favorites.includes(favorite)) {
      removeFavorite(favorite);
    } else {
      addFavorite(favorite);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('Crafty.Favorites')
      .then((value) => {
        if (value) setFavorites(JSON.parse(value));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('Crafty.Favorites', JSON.stringify(favorites)).catch((err) =>
      console.log(err)
    );
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export { FavoriteContext, FavoriteContextProvider };
