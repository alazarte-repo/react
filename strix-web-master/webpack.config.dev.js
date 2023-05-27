const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src', 'img'),
      styles: path.resolve(__dirname, 'src', 'styles'),
      utils: path.resolve(__dirname, 'src', 'utils'),
    },
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  devtool: 'cheap-module-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: [
    // must be first entry to properly set public path
    // 'babel-polyfill',
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
    // './src/webpack-public-path',
    'react-hot-loader/patch',
    // 'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.jsx'), // Defining path seems necessary for this to work consistently on Windows machines.
  ],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      inject: true,
      googleApiKey: 'AIzaSyDj6o3z8SlCeVVTn7X8Y_iCJn2r3ewaCX0',
      envVersion: '3',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')],
        },
        context: '/',
        postcss: () => [autoprefixer],
      },
    }),
    new CopyWebpackPlugin([{ from: 'src/img', to: 'img/' }, { from: 'env.js', to: './' }]),
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=img/[name].[ext]',
      },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /(\.css|\.scss|\.sass)$/,
        exclude: ['/node_modules/', '/html/'],
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
    ],
  },
};
