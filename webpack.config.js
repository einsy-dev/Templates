const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pages = ['index']

module.exports = {
    devServer: {
        port: 3000,
    },
    entry: EntryObject(pages),
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[name][ext]',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.ts', '.js'],
    },
    plugins: [
        ...HtmlPluginObject(pages),
        new MiniCssExtractPlugin({
            filename: 'styles/index.css'
        }),
        new CleanWebpackPlugin(),
    ],
};

function HtmlPluginObject(arr) {
    return arr.map(el => new HtmlWebpackPlugin({
        template: `./src/pages/${el}.html`,
        filename: `${el}.html`,
        chunks: [el]
    }),)
}
function EntryObject(arr) {
    const result = {}
    arr.forEach(el => {
        result[el] = `./src/ts/${el}.ts`
    })
    return result
}