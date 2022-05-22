module.exports = {
  displayName: 'myapp',
  resolver: '@nrwl/jest/plugins/resolver',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@rneui/base|@rneui/themed|react-native-ratings|react-native-keyboard-aware-scroll-view)',
  ],
  moduleFileExtensions: ['ts', 'js', 'html', 'tsx', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/config/jest-setup.ts'],
  moduleNameMapper: {
    '.svg': '@nrwl/expo/plugins/jest/svg-mock',
  },
  transform: {
    "^.+\\.(js|tsx)$": require.resolve('react-native/jest/preprocessor.js'),
    "\\.(ts)$": "ts-jest",
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf)$': require.resolve(
      'react-native/jest/assetFileTransformer.js',
    ),
  },
}
