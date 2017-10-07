const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
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
    finalPackageName = `${packageName}.min.js`;
} else {
    relativeOutputPath = 'build';
    // default package name
    finalPackageName = `${packageName}.es5.js`;
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
                test: /\.jsx?$/,
                include: /src/,
                exclude: /node_modules/,
                use: [{loader: 'babel-loader'}]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
        ]
    },
    externals: {
        fs: '{}',
        tls: '{}',
        net: '{}',
        console: '{}'
    },
    plugins: [
        new WebpackNotifierPlugin({alwaysNotify: true}),
        // scope hoisting plugin
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),

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