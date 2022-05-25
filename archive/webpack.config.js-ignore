const path = require('path');

module.exports = {
    entry: {
      panel: './src/panel.tsx'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
          "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk")
      }
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    }
}