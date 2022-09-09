const path = require('path');

module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules']
    },
    entry: '/dist/scripts/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};