'use strict';

const webpack = require('webpack');
const {HotModuleReplacementPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin} = require('webpack');

const Manifest = require('manifest-revision-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const path = require('path');

const packageName = require('../package.json').name;

const DEPLOYING = process.env.NODE_ENV === 'production';

const finalPackageName = DEPLOYING ? `${packageName}.bundle.min` : `${packageName}.bundle.es5`;

module.exports = function (PATHS) {

    const entryFilename = 'index.js';

    return {
        node: {
            console: true,
            fs: 'empty'
        },

        entry: {
            app: entryFilename
        },

        output: {
            path: PATHS.target,
            filename: `[name].${finalPackageName}.js`,
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
            modules: [
                path.join(PATHS.source, 'main', 'js'),
                path.join(PATHS.source, 'main', 'ts'),
                'node_modules'
            ],
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!postcss-loader'
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader', options: {
                            supportsSync: false
                        }
                    }]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader'
                    ]
                },                    
            ]
        },
        
        plugins: [
            new CleanWebpackPlugin([PATHS.target]),
            new HtmlPlugin({
                title: 'SPA Template',
                filename: 'index.html',
                template:  path.join(PATHS.source, 'template', 'index.html')
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false
            }),
            new WebpackNotifierPlugin({alwaysNotify: true}),
            new webpack.optimize.ModuleConcatenationPlugin(),
            // scope hoisting plugin
            new webpack.optimize.OccurrenceOrderPlugin(),
            new HotModuleReplacementPlugin(),

            new NamedModulesPlugin(),
            new NoEmitOnErrorsPlugin(),

            new StyleLintPlugin({
                configFile: '.stylelintrc',
                files:  path.join(PATHS.source, 'main', 'js', 'styles', '*.css'),
                quiet: false
            }),
            new Manifest(path.join(PATHS.target, 'manifest.json'), {
                rootAssetPath: path.join(PATHS.source, 'main', 'js')
            }),
        ],
    }
};