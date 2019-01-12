
import imageminPngquant from 'imagemin-pngquant'
import util from 'gulp-util'
import yargs from 'yargs'


const headerCat = `
/*!
 *                  $$____________$$
 *                  $___$________$___$
 *                  $_____$$$$$$_____$
 *                 $_____sss___sss____$
 *                $______ii_____ii_____$
 *                 $_______$$$________$
 *     $$$$$$$$     $_______$________$
 *   $$________$       $$_________$$
 *    $_________$     $___$$$$$___$
 *       $______$    $__$________$__$
 *       $_____$    $__$__________$__$
 *      $____$   $$$$__$__________$__$$$$
 *     $___$    $____$__$________$___$___$
 *     $__$     $____$__$________$__$____$
 *    $___$      $____$__$____$_$__$____$
 *      $__$      $____$___$_$_____$___$
 *       $___$$$$$_$___$___$_$____$___$
 *          $$$$$_$____$____$_____$____$
 *                $$$_$_____$______$_$$$
 *                     $$$$___$$$$$
 */
`

function errorHandler(err) {
  util.log([(`${err.name} in ${err.plugin}`).bold.red, '', err.message, ''].join('\n'))
  if (util.env.beep) {
    util.beep()
  }
  this.emit('end')
}

const path = {
  src: 'source/',
  dest: 'app/',
}

const config = {
  isProd: yargs.boolean('prod').argv.prod,
  headerCat,
  src: path.src,
  dest: path.dest,
  plumber: {
    errorHandler,
  },
  styles: {
    src: {
      main: `${path.src}assets/styles/main.less`,
      all: `${path.src}assets/styles/**/*.less`,
    },
    dest: `${path.dest}frontend/styles/`,
    watch: `${path.src}assets/styles/**/*.less`,
    postcss: {
      assets: {
        loadPaths: [
          `${path.dest}frontend/media`,
        ],
        relative: true,
        cache: true,
        cachebuster: true,
      },
      autoprefixer: {
        browsers: [
          '> 5%',
          'last 2 versions',
          'Explorer >= 10',
          'iOS >= 7.1',
        ],
      },
    },
    less: {
      outputStyle: 'expanded',
    },
  },
  fonts: {
    src: `${path.src}assets/fonts/fonts.css`,
    dest: `${path.dest}frontend/styles/`,
    watch: `${path.src}assets/fonts/*.css`,
    base64: {
      extensions: ['woff'],
      maxImageSize: 1024 * 1024 * 10,
    },
  },
  html: {
    src: `${path.src}templates/*.ejs`,
    dest: path.dest,
    watch: [
      `${path.src}**/*.ejs`,
      `${path.src}modules/**/*.ejs`,
    ],
  },
  scripts: {
    src: {
      main: `${path.src}assets/scripts/index.js`,
      all: `${path.src}assets/scripts/**/*.js`,
    },
    dest: `${path.dest}frontend/scripts/`,
    watch: `${path.src}assets/scripts/**/*.js`,
  },
  images: {
    src: `${path.src}assets/media/**/*`,
    dest: `${path.dest}frontend/media/`,
    watch: `${path.src}assets/media/**/*`,
    imagemin: {
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {cleanupIDs: false},
        {removeViewBox: false},
      ],
      use: [imageminPngquant()],
    },
  },
}


export default config
