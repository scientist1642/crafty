import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useFavorites } from '../hooks/favorites';
import FavoriteAssetItem from './FavoriteAssetItem';

function FavoriteAssetsList() {
  const { favorites } = useFavorites();
  console.log(favorites.length == 0);
  if (favorites.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No favorite assets yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => <FavoriteAssetItem assetId={item} />}
    ></FlatList>
  );
}

export default FavoriteAssetsList;
