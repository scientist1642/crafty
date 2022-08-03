import React, { useContext } from 'react';
import { Text, View, SafeAreaView, StatusBar, Button, FlatList } from 'react-native';

import { useInfiniteQuery } from '@tanstack/react-query';
import AssetItem from '../components/AssetItem';
import { queryClient } from '../config';
import { fetchAssets } from '../utils/api';
import { ScrollView } from 'react-native-gesture-handler';

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
      onSuccess: (data) => {
        data.pages[data.pages.length - 1].data.forEach((asset) => {
          //Todo maybe better to use setQueriesData
          queryClient.setQueryData(['asset', asset.id], { data: asset });
        });
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
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data.pages.map((x) => x['data']).flat()}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        renderItem={renderItem}
        ListFooterComponent={isFetchingNextPage ? <Text>Fetching Next Page</Text> : null}
      />
    </SafeAreaView>
  );
}

export default AssetsScreen;
