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
import Spinner from '../components/Spinner';
import FavoriteButton from '../components/FavoriteButton';

const printableDate = (time) => {
  return new Date(time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
};

function SingleAssetScreen({ route }) {
  const { asset } = route.params;
  const { height, width } = useWindowDimensions();
  const { data, error, status } = useQuery(['market', asset.symbol], () =>
    fetchPriceHistory(asset.symbol)
  );
  console.log(data);
  const [selectedPoint, updateSelectedPoint] = React.useState(null);
  const [priceData, setPriceData] = React.useState({
    open: asset.metrics.market_data.price_usd,
    close: asset.metrics.market_data.price_usd,
  });

  if (status == 'loading') return <Spinner />;
  if (status == 'error') return <Text>{error}</Text>;

  /*const chartData = data['data'].values.slice(-96).map((value) => {
    const [timestamp, open, high, low, close, _] = value;
    //console.log([timestamp, open, high, low, close, _]);
    // TODO There might be more elegant way to do this
    return { timestamp, open, high, low, close };
  });*/
  const chartData = data['data'].values.slice(-96).map((dataPoint) => {
    const timestamp = printableDate(dataPoint[0]);
    return {
      x: dataPoint[0],
      y: dataPoint[1],
      open: dataPoint[1],
      close: dataPoint[2],
      time: timestamp,
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.headerContainer}>
        <View style={styles.leftHeader}>
          <Text style={styles.label}>
            <Text style={styles.info}> ${priceData.open.toFixed(3)}</Text>
          </Text>
          <Text style={styles.label}>
            <Text style={styles.info}> {priceData.time}</Text>
          </Text>
        </View>

        <View style={styles.rightHeader}>
          <Text style={styles.label}>
            <Text style={styles.info}> {asset.symbol} </Text>{' '}
          </Text>
          <FavoriteButton assetId={asset.id} />
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          style={{ height: height / 3 }}
          xAxis={{
            gridLineWidth: 0,
            labelCount: 5,
            avoidFirstLastClipping: true,
            granularity: 1,
            granularityEnabled: true,
            valueFormatter: 'date',
            valueFormatterPattern: 'HH:mm',
          }}
          borderWidth={0.5}
          borderColor={processColor('black')}
          drawBorders={true}
          yAxis={{
            left: {
              drawGridLines: false,
            },
            right: {
              enabled: false,
            },
          }}
          legend={{ enabled: false }}
          data={{
            dataSets: [
              {
                label: 'x',
                values: chartData,
                config: {
                  drawCircles: false,
                  lineWidth: 2,
                  drawValues: false,
                  drawFilled: true,
                },
              },
            ],
          }}
          onSelect={(evt) =>
            setPriceData({
              open: evt.nativeEvent['data']['open'],
              close: evt.nativeEvent['data']['close'],
              time: evt.nativeEvent['data']['time'],
            })
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    marginTop: 20,
    margin: 10,
    flexDirection: 'row',
  },
  rightHeader: {
    flex: 1,
  },
  leftHeader: { flex: 4 },
  info: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  label: {
    marginTop: 5,
    fontSize: 20,
    color: 'grey',
  },
});

export default SingleAssetScreen;
