import * as React from 'react';
import { Text, View, SafeAreaView, StatusBar, Button } from 'react-native';

function AssetsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Assets Screen</Text>
      <Button title="Go to Asset" onPress={() => navigation.navigate('SingleAsset')} />
    </View>
  );
}

export default AssetsScreen;
