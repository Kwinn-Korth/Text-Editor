const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Progressive Web Application',
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'Progressive Web Application',
        inject: true,
        short_name: 'JATE',
        description: 'A text editor that works offline',
        background_color: '#2218A7',
        theme_color: '#2218A7',
        start_url: '/',
        publicPath: '/',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      })
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }, 
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };
};
