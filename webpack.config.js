const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    panel: './src/main.tsx'
  },
  watch: true,
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
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    https: true
  },
}