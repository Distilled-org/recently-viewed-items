const path = require('path');
const webpack = require('webpack');
const src = path.join(__dirname, '/client/src')
const dist = path.join(__dirname, '/client/src/dist')


module.exports = {
	mode: 'development',
	entry: `${src}/index.jsx`,

	output: {
		filename: 'bundle.js',
		path: dist
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				include: src,
				loader: 'babel-loader',

				options: {
					plugins: [],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						],
						'@babel/preset-react'
					]
				}
			}
		]
	},

	devServer: {
		open: true
	}
};
