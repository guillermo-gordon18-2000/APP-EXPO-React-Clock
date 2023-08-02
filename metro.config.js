// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Agregar la extensión "cjs" a la lista de extensiones de activos
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
