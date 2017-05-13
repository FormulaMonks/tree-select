const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: path.join(__dirname, "src", "index.tsx"),
  externals: {
    react: true,
    "react-onclickoutside": true
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              insertAt: "top"
            }
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]--[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "src/index.js",
    library: "treeSelect",
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
};
