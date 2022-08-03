import React, { useContext } from 'react';
import { Text, View, SafeAreaView, StatusBar, Button, FlatList } from 'react-native';

import { useInfiniteQuery } from '@tanstack/react-query';
import AssetItem from './AssetItem';
import { queryClient } from '../config';
import { fetchAssets } from '../utils/api';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from './Spinner';
import HeaderText from './HeaderText';

function AllAssetsList({ navigation }) {
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
    <FlatList
      data={data.pages.map((x) => x['data']).flat()}
      keyExtractor={(item) => item.id}
      onEndReached={loadMore}
      renderItem={renderItem}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? <Spinner size="small" style={{ margin: 10 }} /> : null
      }
    />
  );
}

export default AllAssetsList;
