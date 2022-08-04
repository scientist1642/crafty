## General

[Video demo](https://www.youtube.com/watch?v=aNg5kDxL6mU)

The app is scaffolded using create `Create React Native App` and can be run
by the command `npx react-native run-ios/android`

## Notes

There are some things to spend more time on:

- Proper testing and some edge cases
- Better error handling and custom error messages: currently almost all error messages are logged directly for debugging purposes.
- Asset price history comes from messari api's Binance market, it's `$currency-USDT` pair since I couldn't find `$currency-usd` pairs at the time and did't spend more time on it.

## Optimizations

Optimizations haven't been applied yet. We can if we want though:

- Use React.memo and `usecallback`
- Replace flatlist with Bidirectional infinite scroll
- Use a hashset instead of a list to keep favorite asset ids

## Used Libraries

Since the scope of the app is rather limited, we could get away without using some of those libraries listed. But they are quite useful in larger apps, and it was worth to refresh the installation process.

- `react-native-vector-icons`
- `react-navigation`
- `react-native-charts-wrapper` tried `coinjar/react-native-wagmi-charts` and considered `victory`
  but `charts-wrapper` seems to be faster and functional for our purposes.

## Screenshots

![1](https://i.ibb.co/dJBKTZm/1.png)

---

![2](https://i.ibb.co/fvck9sH/2.png)

---

![3](https://i.ibb.co/7RRQFz0/3.png)
