import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import AllAssetsList from '../components/AllAssetsList';
import HeaderText from '../components/HeaderText';

function AssetsScreen({ navigation, route }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderText>All Coins</HeaderText>
      <AllAssetsList />
    </SafeAreaView>
  );
}

export default AssetsScreen;
