
import gulp from 'gulp'

import Styles from './tasks/styles'
import Html from './tasks/html'
import Images from './tasks/images'
import Clean from './tasks/clean'
import Server from './tasks/server'
import config from './config'


gulp.task('styles:build', Styles.build)
gulp.task('styles:lint', Styles.lint)
gulp.task('styles:travis', Styles.travis)

gulp.task('html:build', Html.build)
gulp.task('html:buildEjs', Html.buildEjs)
gulp.task('images:build', Images.build)
gulp.task('clean', Clean.delete)
gulp.task('server', Server.run)

gulp.task('build', gulp.series([
  'clean',
  'images:build',
  'styles:lint', 'styles:build',
  'html:build',
]))

gulp.task('watch', () => {
  gulp.watch(config.styles.watch, gulp.series('styles:build'))
  gulp.watch(config.html.watch, gulp.series('html:build'))
  gulp.watch(config.images.watch, gulp.series('images:build'))
})

gulp.task('default', gulp.series([
  'build',
  gulp.parallel(['watch', 'server']),
]))
