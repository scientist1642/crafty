import * as React from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import { fetchPriceHistory } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

function SingleAssetScreen({ route }) {
  const { asset } = route.params;
  const { data, error, status } = useQuery(['market', asset.symbol], () =>
    fetchPriceHistory(asset.symbol)
  );
  if (status == 'loading') return <Text>Loading...</Text>;
  if (status == 'error') return <Text>{error}</Text>;
  console.log(data);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{asset.slug}</Text>
    </View>
  );
}

export default SingleAssetScreen;
