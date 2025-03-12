module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
  ],
  plugins: [
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-proposal-class-properties',
    'react-native-reanimated/plugin',
  ],
};
