// const { getDefaultConfig } = require("metro-config");

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts }
//   } = await getDefaultConfig();



//   return {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false
//         }
//       }),
//       babelTransformerPath: require.resolve("react-native-svg-transformer")
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"],
//       assets: ["./assets/fonts/"]
//     }
//   };
// })();
// module.exports = {
//   project : {
//     ios :{},
//     android :{}
//   },
//   assets: ["./assets/fonts/"]
// }
module.exports = {
  transformer: {
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
};