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
    const entryFilename = 'index.tsx';

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
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
            // Add 'src' to our modules, as all our app code will live in there, so Webpack should look in there for modules
            modules: [path.join(PATHS.source, 'main', 'js'), path.join(PATHS.source, 'main', 'ts'), 'node_modules'],
        },

        module: {
            rules: [

                { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
                {
                    test:  /\.ts$/,
                    enforce: 'pre',
                    loader: 'tslint-loader',
                    options: {
                        // tslint errors are displayed by default as warnings
                        // set emitErrors to true to display them as errors
                        emitErrors: false,
                        // tslint does not interrupt the compilation by default
                        // if you want any file with tslint errors to fail
                        // set failOnHint to true
                        failOnHint: true,
                        // enables type checked rules like 'for-in-array'
                        // uses tsconfig.json from current working directory
                        typeCheck: false,
                        // automatically fix linting errors
                        fix: false,
                        // can specify a custom tsconfig file relative to current directory or with absolute path
                        // to be used with type checked rules
                        tsConfigFile: 'tsconfig.json',
                        // path to directory containing formatter (optional)
                        fileOutput: {
                            // The directory where each file's report is saved
                            dir: './tslint/',
                            // The extension to use for each report's filename. Defaults to 'txt'
                            ext: 'xml',
                            // If true, all files are removed from the report directory at the beginning of run
                            clean: true,
                            // A string to include at the top of every report file.
                            // Useful for some report formats.
                            header: '<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="5.7">',
                            // A string to include at the bottom of every report file.
                            // Useful for some report formats.
                            footer: '</checkstyle>'
                        }
                    }
                },
                { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
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
            ]
        },

        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
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