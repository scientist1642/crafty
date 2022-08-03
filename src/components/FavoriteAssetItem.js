import { useQuery, QueryCache } from '@tanstack/react-query';
import React from 'react';
import { View, Text } from 'react-native';
import { fetchOptions } from '../utils/api';
import AssetItem from './AssetItem';
import { queryClient } from '../config';
import { fetchAsset } from '../utils/api';

function FavoriteAssetItem({ assetId }) {
  const { data, error, status } = useQuery(['assets', assetId], () => fetchAsset(assetId));

  if (status == 'loading') return <Text>Loading...</Text>;
  if (status == 'error') return <Text>{error}</Text>;

  const { id, symbol, slug } = data['data'];
  const asset = { id, symbol, slug };
  return <AssetItem asset={asset} />;
}

export default FavoriteAssetItem;
