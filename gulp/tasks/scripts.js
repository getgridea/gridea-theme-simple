
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import eslint from 'gulp-eslint'
import wpStream from 'webpack-stream'
import webpack from 'webpack'

import config from '../config'


const options = {
  mode: config.isProd ? 'production' : 'development',
  entry: {
    index: [`./${config.scripts.src.main}`],
    jquery: ['jquery'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$',
      },
    ],
  },
  watchOptions: {aggregateTimeout: 20},
  plugins: [],
  watch: false,
  cache: false,
  performance: {
    hints: false,
  },
  output: {
    filename: '[name].js',
  },
}

class Scripts {
  static build() {
    return gulp.src(config.scripts.src.main)
      .pipe(plumber(config.plumber))
      .pipe(wpStream(options, webpack))
      .pipe(gulp.dest(config.scripts.dest))
  }

  static lint() {
    return gulp.src(config.scripts.src.all)
      .pipe(eslint())
      .pipe(eslint.format())
  }

  static travis() {
    return gulp.src(config.scripts.src.all)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  }
}


export default Scripts
