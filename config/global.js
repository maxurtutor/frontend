'use strict';

const HtmlPlugin = require('html-webpack-plugin');

const path = require('path');

const packageName = require('../package.json').name;

const DEPLOYING = process.env.NODE_ENV === 'production';

const finalPackageName = DEPLOYING ? `${packageName}.bundle.min` : `${packageName}.bundle.es5`;

module.exports = function (PATHS) {

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
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
            modules: [
                path.join(PATHS.source, 'main', 'js'),
                path.join(PATHS.source, 'main', 'ts'),
                'node_modules'
            ],
        },

        module: {
            rules: [
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
            ]
        },
        
        plugins: [
            new HtmlPlugin({
                title: 'SPA Template',
                filename: 'index.html',
                template:  path.join(PATHS.source, 'template', 'index.html')
            })
        ],
    }
};