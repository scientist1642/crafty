import React from 'react';
import { FlatList } from 'react-native';
import { useFavorites } from '../hooks/favorites';
import FavoriteAssetItem from './FavoriteAssetItem';

function FavoriteAssetsList() {
  const { favorites } = useFavorites();
  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => <FavoriteAssetItem assetId={item} />}
    ></FlatList>
  );
}

export default FavoriteAssetsList;
