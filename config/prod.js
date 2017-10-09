'use strict';

/**
 * Production config
 */
module.exports = function(_path) {
    return {
        context: _path,
        devtool: 'cheap-source-map',
        output: {
            publicPath: _path
        }
    }
};