import * as React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  processColor,
  useWindowDimensions,
} from 'react-native';
import { fetchPriceHistory } from '../utils/api';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from 'react-native-charts-wrapper';

function SingleAssetScreen({ route }) {
  const { asset } = route.params;
  const { height, width } = useWindowDimensions();
  const { data, error, status } = useQuery(['market', asset.symbol], () =>
    fetchPriceHistory(asset.symbol)
  );
  const [selectedPoint, updateSelectedPoint] = React.useState(null);

  if (status == 'loading') return <Text>Loading...</Text>;
  if (status == 'error') return <Text>{error}</Text>;

  /*const chartData = data['data'].values.slice(-96).map((value) => {
    const [timestamp, open, high, low, close, _] = value;
    //console.log([timestamp, open, high, low, close, _]);
    // TODO There might be more elegant way to do this
    return { timestamp, open, high, low, close };
  });*/
  const chartData = data['data'].values.slice(-96).map((dataPoint) => {
    return {
      y: dataPoint[1],
    };
  });

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          xAxis={{
            gridLineWidth: 0,
          }}
          yAxis={{
            left: {
              drawGridLines: false,
            },
            right: {
              drawGridLines: false,
            },
          }}
          legend={{ enabled: false }}
          data={{
            dataSets: [
              {
                label: '',
                values: chartData,
                config: {
                  drawCircles: false,
                  lineWidth: 2,
                  drawValues: false,
                },
              },
            ],
          }}
          onSelect={(rame) => updateSelectedPoint(rame.nativeEvent)}
        />
      </View>
      <Text>{JSON.stringify(selectedPoint)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    height: 300,
  },
});

export default SingleAssetScreen;
