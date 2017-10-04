const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const packageName = require('../package.json').name;

// the variable name from which the library should be accessed from
const globalLibraryName = 'WB';

const DEPLOYING = process.env.NODE_ENV === 'production';

// the entry filename of the library (inside src)
const entryFilename = 'index.js';

let relativeOutputPath;
let finalPackageName;
if (DEPLOYING) {
    // update output path
    relativeOutputPath = 'build/dist';
    // update package name to an minified version
    finalPackageName = packageName + '.browser.min.js';
} else {
    relativeOutputPath = 'build/es5';
    // default package name
    finalPackageName = packageName + '.browser.js';
}

const styleConfig = {
    'rules': {
        'block-no-empty': null,
        'color-no-invalid-hex': true,
        'comment-empty-line-before': [ 'always', {
            'ignore': ['stylelint-commands', 'after-comment']
        } ],
        'declaration-colon-space-after': 'always',
        'max-empty-lines': 2,
        'rule-empty-line-before': [ 'always', {
            'except': ['first-nested'],
            'ignore': ['after-comment']
        } ],
        'unit-whitelist': ['px', 'em', 'rem', '%', 's']
    }
};

const config = {
    // devtool is already set with -d (debug) and removed with -p (production) flags from webpack and webpack dev server
    devtool: 'source-map',
    
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:3000',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        entryFilename,
        // the entry point of our app
    ],
    // Output the bundled JS to dist/app.js
    output: {
        path: path.resolve(relativeOutputPath),
        filename: finalPackageName,
        // export itself to a global var
        libraryTarget: 'umd',
        // name of the global var
        library: globalLibraryName,
        umdNamedDefine: true,
        // webpack dev server hot reload path
        publicPath: relativeOutputPath
    },
    resolve: {
        // Look for modules in .js(x) files first, then .js(x)
        extensions: ['.js', '.jsx'],
        // Add 'src' to our modules, as all our app code will live in there, so Webpack should look in there for modules
        modules: ['src', 'node_modules']
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
                use: [
                    {loader: 'babel-loader'}
                ]
            },
            {
                test:   /\.css$/,
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
            },
        ]
    },
    plugins: [
        // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
        new WebpackNotifierPlugin({alwaysNotify: true}),
        new StyleLintPlugin({
            config: styleConfig,
            files: 'src/styles/*.css'
        }),

        // scope hoisting plugin
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
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