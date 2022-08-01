import React, { useContext } from 'react';
import { Text, View, SafeAreaView, StatusBar, Button, FlatList } from 'react-native';

import { useInfiniteQuery } from '@tanstack/react-query';
import AssetItem from '../components/AssetItem';
import { fetchOptions } from '../utils/api';

const fetchAssets = async ({ pageParam = 1 }) => {
  url = `https://data.messari.io/api/v2/assets?limit=20&page=${pageParam}&fields=id,slug,symbol,metrics/market_data/price_usd`;
  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  if ('data' in data) return { data: data['data'], pageParam };
  // TODO make sure that the reason we didn't get data is because we reached the end of the pages
  // and not because of some other error
  else return { data: [], pageParam: -1 }; //-1 indicates end of pages
};

function AssetsScreen({ navigation }) {
  const { data, error, status, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['assets'],
    fetchAssets,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.pageParam != -1)
          //End of pages not reached
          return lastPage.pageParam + 1;
      },
    }
  );
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderItem = ({ item }) => <AssetItem asset={item} />;

  if (status == 'loading') return <Text>Loading...</Text>;
  if (status == 'error') return <Text>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Text>Assets Screen</Text>
      <FlatList
        data={data.pages.map((x) => x['data']).flat()}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListFooterComponent={isFetchingNextPage ? <Text>Fetching Next Page</Text> : null}
      />
      <Button title="Go to Asset" onPress={() => navigation.navigate('SingleAsset')} />
    </View>
  );
}

export default AssetsScreen;
