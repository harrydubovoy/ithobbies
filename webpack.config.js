const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'antd'],
    dashboard: './resources/admin/dashboard.js',
    login: './resources/admin/login.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/admin/javascript'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options:{
          presets:["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              url: false,
            },
          },
          'css-loader',
        ],
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../stylesheet/dashboard.min.css',
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    },
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
};