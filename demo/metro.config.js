const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');
const escapeRegexString = require('escape-regex-string');

module.exports = {
  resolver: {
    blacklistRE: blacklist([
      new RegExp(
        `^${escapeRegexString(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`,
      ),
    ]),
    providesModuleNodeModules: [
      'react-native',
      'react',
      'prop-types',
    ],
    extraNodeModules: {
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
      'react-native-linear-gradient': path.resolve(__dirname, 'node_modules/expo/build/effects/LinearGradient'),
      'chroma-js': path.resolve(__dirname, 'node_modules/chroma-js'),
    },
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '..'),
  ],
};
