
const path = require("path");
const dotenv =require("dotenv");
const webpack = require("webpack");

const env = dotenv.config({path: "./.env"}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  entry: {
    loader: ["@babel/polyfill", "./client/react/loader.jsx"]
  },
  output: {
    filename: 'bundle.js',
    publicPath: "/",
    path:  path.resolve(__dirname, 'dist/bundle'),

  },
  resolve: {
    extensions: [".js", ".jsx", ".styl", ".graphql"]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env",  "@babel/preset-react"]
            }
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          "stylus-loader"
        ]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map"
};
