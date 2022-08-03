import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFavorites } from '../hooks/favorites';

const FavoriteButton = ({ assetId }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(assetId);

  return (
    <TouchableWithoutFeedback onPress={() => toggleFavorite(assetId)}>
      <View>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          color="tomato"
          size={30}
          style={{ width: 50 }}
        ></Icon>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FavoriteButton;
