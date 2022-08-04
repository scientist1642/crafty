import { useQuery, QueryCache } from '@tanstack/react-query';
import React from 'react';
import { View, Text } from 'react-native';
import { fetchOptions } from '../utils/api';
import AssetItem from './AssetItem';
import { queryClient } from '../config';
import { fetchAsset } from '../utils/api';
import Spinner from './Spinner';
import ErrorBox from './ErrorBox';

function FavoriteAssetItem({ assetId }) {
  const { data, error, status } = useQuery(['assets', assetId], () => fetchAsset(assetId), {
    staleTime: Infinity,
  });
  if (status == 'loading') return <Spinner />;
  if (status == 'error') return <ErrorBox error={error} />;

  const asset = data['data'];
  // Quick hack to standartize price property  for assetItem.
  // asset has following schema {id, symbol, name, metrics:{market_data:{price_usd}}}
  // fetchasset returns an object without metrics key so we need to add it
  // It's a bit ugly and better to have schemas for objects but would suffice for now :)

  return <AssetItem asset={asset} />;
}

export default FavoriteAssetItem;
