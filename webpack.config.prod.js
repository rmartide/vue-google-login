const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'vue-google-login.js',
        libraryTarget: 'umd',
        library: 'VueGoogleLogin'
    },
    mode:'production',
    devServer: {
        contentBase: './dev'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
    externals: {
        vue: 'vue'
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    // this hides a lot of useless info
    stats: {
      errorDetails: true,
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
}