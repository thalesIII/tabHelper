const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './client/index.js', //entry point of the app
    output: {
        filename: 'tab-build.js',
        path: path.join(__dirname, '/build'),
    },
    
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/react', '@babel/env'
                        ]
                    }
                }
            },
            {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    },

    // devServer: {
    //     host: 'localhost',
    //     port: 8080,
    //     hot: true,
    //     static: {}
    // },
    
    // plugins: [new htmlWebpackPlugin({
    //     template: 'client/index.html'
    // })]
}