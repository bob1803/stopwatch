const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const devEnv = 'development'
const NODE_ENV = process.env.NODE_ENV || devEnv

module.exports = {
    entry: ['./src/index'],
    devtool: NODE_ENV === devEnv ? 'inline-source-map' : 'hidden-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', 'json']
    },
    plugins: NODE_ENV === devEnv ? [] : [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'static')
    }
}
