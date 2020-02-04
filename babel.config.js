module.exports = (api) => {
  const isBabelJest = api.caller(caller => caller && caller.name === 'babel-jest');
  if (isBabelJest) {
    return {
      presets: [
        'module:metro-react-native-babel-preset',
      ],
    };
  }
  return {
    presets: ['babel-preset-expo'],
  };
};
