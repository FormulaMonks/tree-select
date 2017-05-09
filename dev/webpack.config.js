var path = require("path");

var parentConfig = require("../webpack.config");

module.exports = Object.assign({}, parentConfig, {
  devServer: {
    contentBase: path.resolve(__dirname)
  },
  entry: path.resolve(__dirname, "index.tsx"),
  externals: undefined,
  output: {
    filename: "src/index.js"
  }
});
