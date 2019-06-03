
const path = require("path");
const dotenv =require("dotenv");
const webpack = require("webpack");

const env = dotenv.config({path: "./prod.env"}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});


module.exports = (env) => {
  console.log(env)
  console.log("Dasdasdsdadas")
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
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ],
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
        }, {
          test: /.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        }, {
          test: /\.js$/,
          include: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            }
          }
        }
      ]
    },
  });
}