import { useQuery, QueryCache } from '@tanstack/react-query';
import React from 'react';
import { View, Text } from 'react-native';
import { fetchOptions } from '../utils/api';
import AssetItem from './AssetItem';
import { queryClient } from '../config';

const fetchAsset = async (assetId) => {
  const url = `https://data.messari.io/api/v1/assets/${assetId}`;
  console.log(url);
  const response = await fetch(url, fetchOptions);
  return response.json();
};

function FavoriteAssetItem({ assetId }) {
  const { data, error, status } = useQuery(['asset', assetId], () => fetchAsset(assetId), {
    initialData: () => {
      const cachedData = queryClient
        .getQueryData(['assets'])
        .pages.map((x) => x['data'])
        .flat()
        ?.find((item) => item.id === assetId);
      return { data: cachedData };
    },
  });

  if (status == 'loading') return <Text>Loading...</Text>;
  if (status == 'error') return <Text>{error}</Text>;

  const { id, symbol, slug } = data['data'];
  const asset = { id, symbol, name };
  return <AssetItem asset={asset} />;
}

export default FavoriteAssetItem;
