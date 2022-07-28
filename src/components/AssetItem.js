import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const FavButton = ({ fullIcon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Icon
          name={fullIcon ? 'heart' : 'heart-outline'}
          color="tomato"
          size={30}
          style={{ width: 50 }}
        ></Icon>
      </View>
    </TouchableOpacity>
  );
};

function AssetItem({ asset, isFavorite, onFavoritePress }) {
  return (
    <View
      style={{
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
      }}
    >
      <View style={{ flex: 2 }}>
        <Text style={{ fontWeight: 'bold' }}>{asset.symbol}</Text>
        <Text>{asset.slug}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <FavButton onPress={onFavoritePress} fullIcon={isFavorite} />
      </View>
    </View>
  );
}
export default AssetItem;
