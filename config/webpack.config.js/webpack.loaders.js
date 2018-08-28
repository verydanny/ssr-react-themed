const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MqPacker = require('css-mqpacker')
const CssNano = require('cssnano')
const { webpackIdentity } = require('react-themed-too')

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
        localIdentName: webpackIdentity,
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
        localIdentName: webpackIdentity,
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

const scssLoaderClient = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'css-loader/locals',
      options: {
        camelCase: true,
        modules: true,
        localIdentName: webpackIdentity,
      },
    },
    {
      loader: 'sass-loader'
    }
  ]
}

const scssLoaderServer = {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'css-loader',
      options: {
        camelCase: true,
        modules: true,
        localIdentName: webpackIdentity,
      },
    },
    {
      loader: 'sass-loader'
    }
  ]
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
    scssLoaderClient,
    cssLoaderClient,
    urlLoaderClient,
    fileLoaderClient,
    externalCssLoaderClient,
  ],
}, ]

const server = [{
  oneOf: [
    babelLoader,
    scssLoaderServer,
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
