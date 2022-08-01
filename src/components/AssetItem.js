import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavorites } from '../hooks/favorites';

import Icon from 'react-native-vector-icons/Ionicons';
const FavoriteButton = ({ fullIcon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Icon
          name={fullIcon ? 'heart' : 'heart-outline'}
          color="tomato"
          size={30}
          style={styles.favoriteButton}
        ></Icon>
      </View>
    </TouchableOpacity>
  );
};

function AssetItem({ asset }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(asset.id);
  const onFavoritePress = () => toggleFavorite(asset.id);

  return (
    <View style={styles.assetItem}>
      <View style={{ flex: 2 }}>
        <Text style={{ fontWeight: 'bold' }}>{asset.symbol}</Text>
        <Text>{asset.slug}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <FavoriteButton onPress={onFavoritePress} fullIcon={isFavorite} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    width: 50,
  },
  assetItem: {
    height: 80,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default AssetItem;
