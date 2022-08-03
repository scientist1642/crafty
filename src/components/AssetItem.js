import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FavoriteButton from './FavoriteButton';

function AssetItem({ asset }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SingleAsset', { asset })}>
      <View style={styles.assetItem}>
        <View style={{ flex: 2 }}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>
              {asset.name} <Text style={{ color: 'gray' }}>{asset.symbol}</Text>
            </Text>
            <Text style={{ marginTop: 4, color: 'gray' }}>
              ${asset.metrics.market_data.price_usd.toFixed(5)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <FavoriteButton assetId={asset.id} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
