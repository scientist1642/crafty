import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFavorites } from '../hooks/favorites';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteButton = ({ fullIcon, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <Icon
          name={fullIcon ? 'heart' : 'heart-outline'}
          color="tomato"
          size={30}
          style={styles.favoriteButton}
        ></Icon>
      </View>
    </TouchableWithoutFeedback>
  );
};

function AssetItem({ asset }) {
  const { favorites, toggleFavorite } = useFavorites();
  const navigation = useNavigation();
  const isFavorite = favorites.includes(asset.id);
  const onFavoritePress = () => toggleFavorite(asset.id);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SingleAsset', { asset })}>
      <View style={styles.assetItem}>
        <View style={{ flex: 2 }}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold' }}>{asset.name}</Text>
              <Text style={{ color: 'gray' }}>{'  ' + asset.symbol}</Text>
            </View>
            <Text style={{ marginTop: 4, color: 'gray' }}>
              ${asset.metrics.market_data.price_usd.toFixed(5)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <FavoriteButton onPress={onFavoritePress} fullIcon={isFavorite} />
        </View>
      </View>
    </TouchableOpacity>
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
