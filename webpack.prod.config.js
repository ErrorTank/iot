
const path = require("path");
const dotenv =require("dotenv");
const webpack = require("webpack");



module.exports = (env) => {
  console.log(env)
  return ({

    mode: "production",
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
  });
}