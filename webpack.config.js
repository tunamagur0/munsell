const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', 'frag', 'vert'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: true,
    inline: true,
  },
};
