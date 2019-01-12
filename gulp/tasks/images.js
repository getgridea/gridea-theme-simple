
import gulp from 'gulp'
import gIf from 'gulp-if'
import changed from 'gulp-changed'
import imagemin from 'gulp-imagemin'

import config from '../config'


class Images {
  static build() {
    return gulp.src(config.images.src)
      .pipe(changed(config.images.dest))
      .pipe(gIf(config.isProd, imagemin(config.images.imagemin)))
      .pipe(gulp.dest(config.images.dest))
  }
}


export default Images
