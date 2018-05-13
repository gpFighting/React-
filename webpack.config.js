const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, './src/main.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html'
		})
	],
	module: {
		rules: [
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.less$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'less-loader']},
			{test: /\.(jpg|png|gif|bpm|jpeg)$/, use: 'url-loader?limit=5000&name=[hash:8]-[name].[ext]'},
			{test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/}
		]
	}
}