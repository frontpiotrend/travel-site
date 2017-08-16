var path = require('path');

module.exports = {
	entry: "./app/assets/scripts/app.js",												//which file looking at	to create bundle
	output: {																					//where bundled file should be outputed to
		path: path.resolve(__dirname, "./app/temp/scripts"),		
		filename: "app.js"
	},
	//telling webpack that 'babel-loader'-plugin should be applied to javascript-files
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
}