import React from 'react';
import { ActivityIndicator, View } from 'react-native';

function Spinner(props) {
  const size = props.size || 'large';
  const fullScreenProps = { flex: 1, justifyContent: 'center' };
  return (
    <View style={props.fullScreen ? fullScreenProps : { margin: 10 }}>
      <ActivityIndicator size={size} color="gray" />
    </View>
  );
}

export default Spinner;
