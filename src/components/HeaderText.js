import React from 'react';
import { StyleSheet, Text } from 'react-native';

function HeaderText(props) {
  return <Text style={style} {...props} />;
}

const style = StyleSheet.create({
  fontWeight: 'bold',
  fontSize: 30,
  textAlign: 'center',
});

export default HeaderText;
