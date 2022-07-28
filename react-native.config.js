// https://github.com/oblador/react-native-vector-icons
// Avoid adding all fonts to build phase
module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
