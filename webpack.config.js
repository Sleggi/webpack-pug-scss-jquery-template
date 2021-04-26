const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack")
const ENV = process.env.NODE_ENV || "development"

module.exports = {
  mode: ENV,

  entry: {
    index: path.resolve(__dirname, "src", "index.js")
  },

  devServer: {
    port: 5000,
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ]
  },

  optimization: {
    minimizer: ENV === "production" ? [new TerserPlugin()]: [],
    splitChunks: { chunks: "all" },
  },

  output: {
    path: path.resolve(__dirname, "build")
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.pug")
    })
  ]
};
