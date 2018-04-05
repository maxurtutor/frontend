'use strict';

/**
 * Production config
 */
module.exports = function(PATHS) {
    return {
        context: PATHS.target,
        devtool: 'cheap-source-map',
        output: {
            publicPath: PATHS.target
        }
    }
};