import React from 'react';

import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ErrorBox({ error }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Text style={styles.errorText}>{error.message}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  errorText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ErrorBox;
