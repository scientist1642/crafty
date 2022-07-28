import React, { useContext } from 'react';

import { FavoriteContext } from '../contexts/FavoriteContext';

const useFavorites = () => useContext(FavoriteContext);

export { useFavorites };
