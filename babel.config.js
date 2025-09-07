module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove the old reanimated plugin since it's causing issues
      // 'react-native-reanimated/plugin', // This should be last
    ],
  };
};