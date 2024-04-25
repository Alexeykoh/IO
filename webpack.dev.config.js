const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist'),
        },
        historyApiFallback: {
            rewrites: [
                { from: /^\/subpage/, to: '/index.html' },
                { from: /./, to: '/index.html' },
            ],
        },
        compress: true,
        port: 8080,
    },
};
