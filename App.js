/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import AssetsScreen from './src/screens/AssetsScreen';
import SingleAssetScreen from './src/screens/SingleAssetScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoriteContextProvider } from './src/contexts/FavoriteContext';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function AssetsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Assets" component={AssetsScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SingleAsset" component={SingleAssetScreen} />
    </HomeStack.Navigator>
  );
}

const App: () => Node = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteContextProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={AssetsStackScreen} />
            <Tab.Screen name="Favorites" component={FavoriteScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </FavoriteContextProvider>
    </QueryClientProvider>
  );
};

export default App;
