const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const DotenvWebpackPlugin = require('dotenv-webpack');

const EslingPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
    // entry: path.resolve(__dirname, './src/index.js'),
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/i, // Добавлено правило для SCSS
                use: [
                    'style-loader', // Вставляет CSS в DOM
                    'css-loader', // Преобразует CSS в CommonJS
                    'sass-loader', // Преобразует SCSS в CSS
                ],
            },
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'assets/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        // extensions: ['.js'],
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        // new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            favicon: path.resolve(__dirname, './assets/svg/GR__favicon_min.png'),
            // favicon: path.resolve(__dirname, './assets/svg/GR_favicon.ico'),
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
        new CopyWebpackPlugin({
            patterns: [{ from: 'assets', to: 'assets' }],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
