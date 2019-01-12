
import del from 'del'

import config from '../config'


class Clean {
  static delete() {
    return del(config.dest)
  }
}


export default Clean
