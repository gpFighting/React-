const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')               //每次重新构建时删除dist文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')            //分离第三方包 第一步 ： 导入webpack
module.exports = {
	entry: {
		app:path.join(__dirname, './src/main.js'),
		vendors: ['jquery']				 //第二步： 将要分离的第三方包的名字放到这个数组中
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'js/bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html',
			minify: {                                                     //优化压缩html代码
				collapseWhitespace: true, //合并多余的空格
				removeComments: true,  //移除注释
				removeAttributeQuotes: true  //移除属性上的双引号
			}
		}),
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin({
			filename: 'css/style.css'
		}),
		new OptimizeCssAssetsPlugin()		
	],
	optimization: {                            //第三步： webpack4移除了commentsChunksPlugin 使用内置的optimization设置
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					// test: /node_modules/,
					chunks: 'initial',
					name: 'vendors'
				}

			}
		}
	},
	module: {
		rules: [
			{test: /\.css$/, use: ExtractTextPlugin.extract({
				fallback:'style-loader',
				use:"css-loader",
				publicPath: '../'
			})},
			{test: /\.less$/, use:ExtractTextPlugin.extract({
				fallback:  'style-loader',
				use:['css-loader', 'less-loader'],
				publicPath: '../'
			})},
			{test: /\.(jpg|png|gif|bpm|jpeg)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]'},
			{test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
		]
	}
}