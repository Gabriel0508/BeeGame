const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",

  entry: "./src/app.ts",

  mode: "development",

  module: {
    rules: [
      {
        test: /\.ts$/,

        use: "ts-loader",

        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico\gif\jpg\png]jpeg)$/i,
        type: "assets/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/app.html",
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },

  devServer: {
    hot: false,
  },

  output: {
    publicPath: "/",

    filename: "bundle.js",

    path: path.resolve(__dirname, "public"),
  },
};
