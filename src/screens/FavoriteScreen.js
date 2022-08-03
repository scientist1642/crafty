import * as React from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';
import FavoriteAssetsList from '../components/FavoriteAssetsList';
import HeaderText from '../components/HeaderText';

function FavoriteScreen() {
  return (
    <SafeAreaView>
      <HeaderText>Favorite Coins</HeaderText>
      <FavoriteAssetsList />
    </SafeAreaView>
  );
}

export default FavoriteScreen;
