const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');
const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (config, context) => {
  const replacementEntry = context.fileReplacements.find(entry => entry.replace === 'src/environments/environment.ts')?.with;

  if (replacementEntry) {
    const content = fs.readFileSync(replacementEntry, 'utf8');
    const environmentStartIndex = content.indexOf('{');
    if (environmentStartIndex !== -1) {
      const environmentEndIndex = content.indexOf('};');
      if (environmentEndIndex !== -1) {
        const environmentContent = content.substring(environmentStartIndex, environmentEndIndex + 1);
        console.log('\n'+environmentContent)
      }
    }
  }

  return merge(config, {
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // Remove console.* statements
              },
            },
          }),
        ],
      },
    plugins: [
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        deleteOriginalAssets: false,
        test: /\.(js|css|html|svg|ttf|woff2)$/,
        threshold: 1125,
        minRatio: 0.99,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
      }),
    ],
  });
};