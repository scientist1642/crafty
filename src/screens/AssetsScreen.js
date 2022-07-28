import React, { useContext } from 'react';
import { Text, View, SafeAreaView, StatusBar, Button, FlatList } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useFavorites } from '../hooks/favorites';
import AssetItem from '../components/AssetItem';

const fetchAssets = async () => {
  const response = await fetch(
    'https://data.messari.io/api/v2/assets?fields=id,slug,symbol,metrics/market_data/price_usd'
  );
  const data = response.json();
  console.log(data);
  return data;
};

function AssetsScreen({ navigation }) {
  const { data, error, isError, isLoading } = useQuery(['assets'], fetchAssets);
  const { favorites, toggleFavorite } = useFavorites();

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>{error}</Text>;

  //return <Text>{JSON.stringify(data)}</Text>;
  const renderItem = ({ item }) => (
    <AssetItem
      asset={item}
      isFavorite={favorites.includes(item.id)}
      onFavoritePress={() => toggleFavorite(item.id)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>Assets Screen</Text>
      <FlatList data={data['data']} renderItem={renderItem} />
      <Button title="Go to Asset" onPress={() => navigation.navigate('SingleAsset')} />
    </View>
  );
}

export default AssetsScreen;
