'use strict';

/**
 * Development config
 */
module.exports = function(_path) {

    return {
        context: _path,
        devtool: 'source-map',
        devServer: {
            host: 'localhost',
            port: 3000,
            historyApiFallback: true,
            // respond to 404s with index.html
            hot: true,
            // enable HMR on the server
        }
    }
};