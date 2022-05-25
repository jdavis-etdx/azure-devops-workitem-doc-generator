const path = require("path")

module.exports = {
  context: path.resolve(__dirname, "."),
    entry: './src/panel.tsx',
    watch: true,
    mode: 'development',
    devtool: "source-map",
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            enforce: "pre",
            use: ["source-map-loader"],
          },
        ],
      },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      https: true,
      compress: true,
      port: 3000
    }
}