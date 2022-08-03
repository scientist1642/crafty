import React from 'react';
import { ActivityIndicator, View } from 'react-native';

function Spinner(props) {
  return <ActivityIndicator size="large" color="gray" {...props} />;
}

export default Spinner;
