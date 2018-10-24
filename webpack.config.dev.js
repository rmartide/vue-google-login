const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './dev/index.js',
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'webpack.bundle.js'
    },
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
    plugins: [
        new VueLoaderPlugin()
    ]
}