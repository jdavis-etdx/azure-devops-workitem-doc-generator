const path = require('path');

module.exports = {
    entry: './src/document-generator.ts',
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
        filename: 'document-generator.js',
        path: path.resolve(__dirname, 'dist'),
      }
}