const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        port: 3000,
    },
    entry: './src/index.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new StylelintPlugin({
            files: 'src/less/*.less',
            syntax: 'less',
        }),
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8,
        }),
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            experimentalUseImportModule: true,
            filename: 'app.css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true, // remove console statement
                    },
                },
            }),
        ],
    },
    performance: {
        maxAssetSize: 682000,
        maxEntrypointSize: 4000000,
    },
    resolve: {
        extensions: ['.*', '.js', '.jsx'],
    },
};
