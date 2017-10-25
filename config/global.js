'use strict';

const path = require('path');
const webpack = require('webpack');
const {HotModuleReplacementPlugin, NamedModulesPlugin, NoEmitOnErrorsPlugin} = require('webpack');
const Manifest = require('manifest-revision-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const packageName = require('../package.json').name;

let finalPackageName;

const DEPLOYING = process.env.NODE_ENV === 'production';
if (DEPLOYING) {
    // update package name to an minified version
    finalPackageName = `${packageName}.bundle.min`;
} else {
    // default package name
    finalPackageName = `${packageName}.bundle.es5`;
}

module.exports = function (PATHS) {

    // the entry filename of the library (inside src)
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
            chunkFilename: '[id].[chunkhash].js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.less'],
            // Add 'src' to our modules, as all our app code will live in there, so Webpack should look in there for modules
            modules: [path.join(PATHS.source, 'main', 'js'), 'node_modules'],
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
                    test: /\.(gif)$/,
                    use: [
                        'file-loader'
                    ],
                },
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
                    test: [/\.wexbim$/, /\.docx$/, /\.csv$/, /\.mp4$/, /\.xlsx$/, /\.doc$/, /\.avi$/, /\.webm$/, /\.mov$/, /\.mp3$/, /\.pdf$/],
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'url-loader'
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [
                        'url-loader?limit=200000',
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

            new HtmlPlugin({
                title: 'Frontend Template',
                filename: 'index.html',
                template:  path.join(PATHS.source, 'template', 'index.html')
            })
        ],
    }
};