import Reactotron from 'reactotron-react-native';
import { AsyncStorage } from 'react-native';

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

console.tron = (value) => Reactotron.log(value);
/*console.tron = (name, value) =>
  Reactotron.display({
    name: name,
    value: value,
    preview: name,
    important: true,
  });*/
Reactotron.clear();
