/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { NODE_ENV = "development" } = process.env;
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const Dotenv = require("dotenv-webpack");
const hq = require("alias-hq");

module.exports = {
  entry: "./src/main.ts",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    devtoolModuleFilenameTemplate: "[absolute-resource-path]"
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: hq.get("webpack")
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [
    new NodemonPlugin(),
    new Dotenv({ path: `${process.env.PWD}/sandbox.env` })
  ],
  devtool: "source-map"
};
