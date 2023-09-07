const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require("./package.json");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: 3000
    },
    output: {
        publicPath: 'http://localhost:3000/'
    },
    entry: "./src/index",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.jsx?$/,
                loader: require.resolve("babel-loader"),
                options: {
                    presets:  ["@babel/preset-env",  ["@babel/preset-react", {"runtime": "automatic"}]],
                },
            },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.pdf$/, loader: "file-loader"}
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "ClientApp",
            remotes: {
                AdminApp: 'adminApp@http://localhost:3001/export.js'
            },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new Dotenv({
            path: `./.env`,
            safe: false
        })
    ]
}