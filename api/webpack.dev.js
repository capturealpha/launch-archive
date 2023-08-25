import { resolve as _resolve } from "path";
const { NODE_ENV = "development" } = process.env;
import NodemonPlugin from "nodemon-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import Dotenv from "dotenv-webpack";
import { get } from "alias-hq";

export const entry = "./src/main.ts";
export const mode = NODE_ENV;
export const target = "node";
export const output = {
  path: _resolve(__dirname, "dist"),
  filename: "server.js",
  devtoolModuleFilenameTemplate: "[absolute-resource-path]"
};
export const resolve = {
  extensions: [".ts", ".js"],
  alias: get("webpack")
};
export const externals = [nodeExternals()];
export const module = {
  rules: [
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: "ts-loader"
    }
  ]
};
export const plugins = [
  new NodemonPlugin(),
  new Dotenv({ path: `${process.env.PWD}/testnet.env` })
];
export const devtool = "source-map";
