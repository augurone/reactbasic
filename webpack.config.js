const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

// const timestampPlugin = function timestampPlugin() { // function required for `this.plugin`
//     const red = '\x1b[31m';
//     const reset = '\x1b[0m';
//     this.plugin('watch-run', (watching, callback) => {
//         // eslint-disable-next-line no-console
//         console.log(red, `\n--> begin compile at ${new Date().toLocaleTimeString()}`, reset);
//         callback();
//     });
// };

const webpackPlugins = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
        /**  Options similar to the same options in webpackOptions.output */
        filename: './app.min.css',
        chunkFilename: '[id].css',
    }),
    new CssoWebpackPlugin(),
    new StyleLintPlugin({
        files: 'src/**/*.less',
        syntax: 'less',
    }),
    // timestampPlugin,
    new webpack.BannerPlugin({
        banner: `Behance React built ${new Date()}`,
    }),
];

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
    mode: process.env.NODE_ENV || 'development',
    devServer: { contentBase: path.join(__dirname, 'src') },
    resolve: {
        symlinks: false,
        /**
         * these aliases below prevent webpack from loadig these packages
         * if they exist as dependency of a node module
         */
        alias: {
            '@react': path.resolve(__dirname, 'node_modules', '@react'),
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        },
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                    },
                },
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules(?!(\/|\\)(@dexter)(\/|\\))|\.spec\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    failOnError: true,
                },
            },
            {
                test: /\.css$/,
                loader: 'ignore-loader',
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                ],
            },
        ],
    },
    plugins: webpackPlugins,
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true,
            extractComments: false,
        })],
    },
};
