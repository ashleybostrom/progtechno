const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    stats: { children: true },
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
        title: 'Progressive Web Application',
        template: './src/index.html',
        filename: './index.html'
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'sw.js',
      }),
      new WebpackPwaManifest({
        inject: true,
        fingerprints: false,
        name: 'JATE',
        short_name: 'JATE',
        description: 'JATE is a progressive web application that allows users to edit text.',
        background_color: '#01579b',
        theme_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('./src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
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
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
          },
          },
        },
      ],
    },
  };
};
