import * as React from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import FavoriteAssetsList from '../components/FavoriteAssetsList';

function FavoriteScreen() {
  return (
    <SafeAreaView>
      <FavoriteAssetsList />
    </SafeAreaView>
  );
}

export default FavoriteScreen;
