const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)

// Add support for .tflite files
config.resolver.assetExts.push('tflite');

module.exports = withNativeWind(config, { input: './global.css' })