const path = require('path');

module.exports = {
	mode: "development",
	entry: {
		frontend_script: path.resolve(__dirname, './wp-content/themes/twentytwentythree-child/js/src/frontend_script.js'),
		blockextention: path.resolve(__dirname, './wp-content/themes/twentytwentythree-child/js/src/blockextention.js'),
	},
	devtool: false,
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						}
					}
				]
			},
		]
	},
	output: {
		path: path.resolve(__dirname, './wp-content/themes/twentytwentythree-child/js/dist'),
		filename: '[name].bundle.js',
	}
};
