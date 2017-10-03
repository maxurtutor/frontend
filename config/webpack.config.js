const path = require('path');
const webpack = require('webpack');
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

const config = {
    // devtool is already set with -d (debug) and removed with -p (production) flags from webpack and webpack dev server
    devtool: 'source-map',

    entry: [
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
        libraryTarget: "umd",
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
                test: /\.jsx?$/,
                // Skip any files outside of `src` directory
                include: /src/,
                exclude: /node_modules/,
                // loaders depending on target (ES6 or ES5)
                use: [
                    {loader: 'babel-loader'}
                ]
            }
        ]
    },
    plugins: [
        // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
        new WebpackNotifierPlugin({alwaysNotify: true}),

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