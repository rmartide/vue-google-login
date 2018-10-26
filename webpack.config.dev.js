const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './dev/index.js',
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'webpack.bundle.js'
    },
    mode:'development',
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
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css|scss|sass$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }

        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({ template: './dev/index.html' }),
    ]
}