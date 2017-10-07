const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const packageName = require('../package.json').name;

const DEPLOYING = process.env.NODE_ENV === 'production';

// the entry filename of the library (inside src)
const entryFilename = 'index.js';

let relativeOutputPath;
let finalPackageName;
if (DEPLOYING) {
    // update output path
    relativeOutputPath = 'build';
    // update package name to an minified version
    finalPackageName = `${packageName}.bundle.min.js`;
} else {
    relativeOutputPath = 'build';
    // default package name
    finalPackageName = `${packageName}.bundle.es5.js`;
}

const config = {
    // devtool is already set with -d (debug) and removed with -p (production) flags from webpack and webpack dev server
    devtool: 'source-map',

    node: {
        console: true,
        fs: 'empty'
    },

    entry: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:3000',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // the entry point of our app
        entryFilename,
    ],
    // Output the bundled JS to dist/app.js
    output: {
        path: path.resolve(relativeOutputPath),
        filename: finalPackageName,
        // webpack dev server hot reload path
        publicPath: relativeOutputPath
    },
    resolve: {
        // Look for modules in .js(x) files first, then .js(x)
        extensions: ['.js', '.jsx'],
        // Add 'src' to our modules, as all our app code will live in there, so Webpack should look in there for modules
        modules: ['src/main/js', 'node_modules'],
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
        //new BundleAnalyzerPlugin({analyzerMode: 'static'}),
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

        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')},
            __DEV__: true
        })

    ],

    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true,
        // respond to 404s with index.html
        hot: true,
        // enable HMR on the server
    },
};

module.exports = config;