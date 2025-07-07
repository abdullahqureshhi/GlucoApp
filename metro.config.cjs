// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = function (baseConfig) {
  const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
  const {resolver: {assetExts, sourceExts}} = defaultConfig;

  return mergeConfig(
    defaultConfig,
    {
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    },
  );
};




// import { getDefaultConfig } from 'metro-config';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // Get the current directory (__dirname equivalent)
// const __dirname = dirname(fileURLToPath(import.meta.url));

// const metroConfig = async () => {
//   const defaultConfig = await getDefaultConfig();
//   defaultConfig.watchFolders = [__dirname];
//   defaultConfig.resolver = {
//     ...defaultConfig.resolver,
//     resolverMainFields: ['react-native', 'browser', 'main'],
//   };
//   defaultConfig.server = {
//     ...defaultConfig.server,
//     enhanceMiddleware: (middleware) => middleware,
//   };
//   defaultConfig.watcher = {
//     usePolling: true,
//     enableSymlinks: false,
//   };
//   return defaultConfig;
// };

// export default metroConfig();


