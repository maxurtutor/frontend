'use strict';

const path = require('path');
const webpack = require('webpack');
const Manifest = require('manifest-revision-webpack-plugin');
const TextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const packageName = require('../package.json').name;

let finalPackageName;

const DEPLOYING = process.env.NODE_ENV === 'production';
if (DEPLOYING) {
    // update package name to an minified version
    finalPackageName = `${packageName}.bundle.min.js`;
} else {
    // default package name
    finalPackageName = `${packageName}.bundle.es5.js`;
}

module.exports = function (_path) {

    // the entry filename of the library (inside src)
    const entryFilename = 'index.js';

    return {
        node: {
            console: true,
            fs: 'empty'
        },

        entry: [
            entryFilename
        ],

        output: {
            path: _path,
            filename: finalPackageName,
        },
        resolve: {
            // Look for modules in .js(x) files first, then .js(x)
            extensions: ['.js', '.jsx'],
            // Add 'src' to our modules, as all our app code will live in there, so Webpack should look in there for modules
            modules: ['src/main/js', 'node_modules'],
            alias: {
                _svg: path.join(_path, 'assets', 'svg'),
                _data: path.join(_path, 'data'),
                _fonts: path.join(_path, 'assets', 'fonts'),
                _modules: path.join(_path, 'modules'),
                _images: path.join(_path, 'assets', 'images'),
                _stylesheets: path.join(_path, 'assets', 'stylesheets'),
                _templates: path.join(_path, 'assets', 'templates')
            }
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.jsx?$/,
                    include: /src/,
                    exclude: /node_modules/,
                    use: [
                        {loader: 'eslint-loader'}
                    ]
                },
                {
                    test: /\.jsx?$/,
                    include: /src/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!postcss-loader'
                },
                {
                    test: [/\.wexbim$/, /\.docx$/, /\.csv$/, /\.mp4$/, /\.xlsx$/, /\.doc$/, /\.avi$/, /\.webm$/, /\.mov$/, /\.mp3$/, /\.pdf$/],
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [
                        'url-loader?limit=200000',
                    ],
                },
                {
                    test: /\.(gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                query: {
                                    name: 'assets/[name].[ext]',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.jsx\.html$/,
                    exclude: /node_modules/,
                    use: [
                        'babel!react-pure-html-component',
                    ],
                }
            ]
        },

        externals: {
            fs: '{}',
            tls: '{}',
            net: '{}',
            console: '{}'
        },
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false
            }),
            new WebpackNotifierPlugin({alwaysNotify: true}),
            new webpack.optimize.ModuleConcatenationPlugin(),
            // scope hoisting plugin
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),

            new webpack.NamedModulesPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),

            new StyleLintPlugin({
                configFile: '.stylelintrc',
                files: 'src/main/js/styles/*.css',
                quiet: false
            }),

            /*            new webpack.optimize.CommonsChunkPlugin({
                            names: ['vendors', 'assets/js/vendors.[hash].js'],
                            minChunks: Infinity
                        }),
            new TextPlugin('assets/css/[name].[hash].css'),
                       new Manifest(path.join(_path, 'manifest.json'), {
                            rootAssetPath: rootAssetPath
                        }),*/
            new HtmlPlugin({
                title: 'Frontend Template',
                filename: 'index.html',
                template: path.resolve('src/template/index.html')
            })
        ],
    }
};