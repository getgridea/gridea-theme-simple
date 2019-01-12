
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import ejs from 'gulp-ejs'

import config from '../config'


class Html {
  static build() {
    return gulp.src(config.html.src)
      .pipe(plumber(config.plumber))
      .pipe(ejs({}, {}, {ext: '.html'}))
      .pipe(gulp.dest(config.html.dest))
  }
}


export default Html
