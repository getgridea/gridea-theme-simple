
import gulp from 'gulp'
import gIf from 'gulp-if'
import plumber from 'gulp-plumber'
import base64 from 'gulp-base64'
import cssnano from 'gulp-cssnano'
import postcss from 'gulp-postcss'
import postcssFontMagician from 'postcss-font-magician'

import config from '../config'


class Fonts {
  static build() {
    return gulp.src(config.fonts.src)
      .pipe(plumber(config.plumber))
      .pipe(postcss([
        postcssFontMagician({
          formats: 'woff',
          foundries: ['google'],
          protocol: 'https:',
          variants: {},
        }),
      ]))
      .pipe(base64(config.fonts.base64))
      .pipe(gIf(config.isProd, cssnano({
        discardUnused: {
          fontFace: false,
        },
      })))
      .pipe(gulp.dest(config.fonts.dest))
  }
}


export default Fonts
