'use strict';
const path = require('path');
const _ = require('lodash');

const _configs = {
    global: require(__dirname + '/global'),
    production: require(__dirname + '/prod'),
    development: require(__dirname + '/dev')
};

const _path = path.resolve('build');

const _load = function (environment) {
    if (!environment) throw 'Can\'t find local environment variable via process.env.NODE_ENV';
    if (!_configs[environment]) throw 'Can\'t find environments see _config object';

    return _configs && _.merge(
        _configs[environment](_path),
        _configs['global'](_path)
    );
};

module.exports = _load(process.env.NODE_ENV);