/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// Todo navigation can be moved out to a separate file for cleaner App.js

import React from 'react';
import type { Node } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import AssetsScreen from './screens/AssetsScreen';
import SingleAssetScreen from './screens/SingleAssetScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import { queryClient } from './config';
import { QueryClientProvider } from '@tanstack/react-query';
import { FavoriteContextProvider } from './contexts/FavoriteContext';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AssetsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Assets" component={AssetsScreen} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="SingleAsset"
        component={SingleAssetScreen}
        options={({ route }) => ({ title: route.params.asset.name + '-' + 'USDT' })}
      />
    </HomeStack.Navigator>
  );
}
function FavoriteStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SingleAsset"
        component={SingleAssetScreen}
        options={({ route }) => ({ title: route.params.asset.name + '-' + 'USDT' })}
      />
    </HomeStack.Navigator>
  );
}

const App: () => Node = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'HomeTab') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'FavoriteTab') {
                  iconName = focused ? 'heart' : 'heart-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen
              name="HomeTab"
              tabBarLabel="Home"
              component={AssetsStackScreen}
              options={{ title: 'Home' }}
            />
            <Tab.Screen
              name="FavoriteTab"
              component={FavoriteStackScreen}
              options={{ title: 'Favorite' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </FavoriteContextProvider>
    </QueryClientProvider>
  );
};

export default App;
