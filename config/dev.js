'use strict';

/**
 * Development config
 */
module.exports = function (_path) {

    return {
        context: _path,
        devtool: 'source-map',

        entry: [
            'react-hot-loader/patch',
            // activate HMR for React
            'webpack-dev-server/client?http://localhost:3000',
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint
            'webpack/hot/only-dev-server',
        ],
        devServer: {
            host: 'localhost',
            port: 3000,
            compress: true,
            // respond to 404s with index.html
            historyApiFallback: true,
            // enable HMR on the server
            hot: true,
        }
    }
};