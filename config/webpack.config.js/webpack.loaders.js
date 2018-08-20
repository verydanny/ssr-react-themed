const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MqPacker = require('css-mqpacker')
const CssNano = require('cssnano')

const babelLoader = {
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
}

const cssLoaderClient = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'css-loader/locals',
      options: {
        camelCase: true,
        modules: true,
        localIdentName: '[name]__reactthemed--[hash:base64:5]',
      },
    }
  ],
}

const cssLoaderServer = {
  test: /\.css$/,
  exclude: /node_modules/,
  use: [{
      loader: 'css-loader',
      options: {
        camelCase: true,
        modules: true,
        localIdentName: '[name]__reactthemed--[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: loader => [
          MqPacker,
          CssNano
        ]
      }
    }
  ],
}

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader')
}

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
}

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|json|ejs)$/],
  use: [{
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[hash:8].[ext]',
    },
  }, ],
}

const fileLoaderServer = {
  exclude: [/\.(js|css|mjs|html|json|ejs)$/],
  use: [{
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[hash:8].[ext]',
      emitFile: false,
    },
  }, ],
}

const externalCssLoaderClient = {
  test: /\.css$/,
  include: /node_modules/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
}

const externalCssLoaderServer = {
  test: /\.css$/,
  include: /node_modules/,
  loader: 'css-loader/locals',
}

const client = [{
  oneOf: [
    babelLoader,
    cssLoaderClient,
    urlLoaderClient,
    fileLoaderClient,
    externalCssLoaderClient,
  ],
}, ]

const server = [{
  oneOf: [
    babelLoader,
    cssLoaderServer,
    urlLoaderServer,
    fileLoaderServer,
    externalCssLoaderServer,
  ],
}, ]

module.exports = {
  client,
  server,
}
