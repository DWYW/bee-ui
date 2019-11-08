export default {
  /**
   * Get the screen size.
   * @returns {Object}
   */
  availScreen () {
    return {
      width: Math.min(window.innerWidth, document.documentElement.clientWidth),
      height: Math.min(window.innerHeight, document.documentElement.clientHeight),
      ratio: window.devicePixelRatio
    }
  },

  /**
   * The type of the unevaluated opearand.
   * @param {any}[required] data
   * @param {string} type The type of expected
   * @returns {(string|boolean)}
   */
  typeof (data, type) {
    var _type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()

    if (typeof type === 'string') {
      return _type === type
    }

    return _type
  },

  /**
   * Data deep copy.
   * @param {abt} target
   * @returns {any}
   */
  deepCopy (target) {
    let caches = []

    const _deepCopy = (_target) => {
      if (this.typeof(_target, 'object') || this.typeof(_target, 'array')) {
        let _copy = {}
        _copy = this.typeof(_target, 'array') ? [] : _copy

        /**
         * check has ben copyed.
         * Prevent never-ending loop
         */
        let index = caches.length

        while (index--) {
          if (caches[index].origin === _target) {
            return caches[index].copy
          }
        }

        caches.push({
          origin: _target,
          copy: _copy
        })

        for (let key in _target) {
          if (_copy[key]) break

          _copy[key] = _deepCopy(_target[key])
        }

        return _copy
      }

      if (this.typeof(_target, 'date')) {
        return new Date(_target.getTime())
      }

      return _target
    }

    return _deepCopy(target)
  },

  /**
   * Compare target and origin.
   * @param {any} target
   * @param {any} origin
   * @returns {boolean}
   */
  equal (target, origin) {
    if (target === origin) return true

    const targetType = this.typeof(target)
    const originType = this.typeof(origin)

    if (targetType !== originType) return false

    if (targetType === 'null' || targetType === 'undefined') return true

    if (targetType === 'array') {
      if (target.length !== origin.length) return false

      let index = target.length

      while (index--) {
        if (!this.equal(target[index], origin[index])) {
          return false
        }
      }

      return true
    } else if (targetType === 'object') {
      let keys = []

      for (let key in target) {
        if (!this.equal(target[key], origin[key])) {
          return false
        }

        keys.push(key)
      }

      for (let key in origin) {
        if (keys.indexOf(key) === -1) return false
      }

      return true
    } else {
      return target.toString() === origin.toString()
    }
  },

  /**
   * get css attribute
   * @param  {Element} element target html dom
   * @param  {String} attr     css attribute
   * @return {String}
   */
  getCss (element, attr) {
    if (element.currentStyle) {
      return element.currentStyle[attr]
    } else if (window.getComputedStyle && window.getComputedStyle(element, null)) {
      return window.getComputedStyle(element, null).getPropertyValue(attr)
    } else {
      return element.style[attr]
    }
  },

  /**
   * Get the value at path of object or array.
   * @param {array|Object}[required] data
   * @param {string}[required] path the path of the property to get
   * @param {any} resolve the value returned for undefined resolved value.
   * @returns {any}
   */
  getValueByPath (data, path, resolve) {
    const attrs = path.match(/\w+/g) || []
    let index = 0

    while (index < attrs.length && data !== null && data !== undefined) {
      data = data[attrs[index++]]
    }

    data = index && index === attrs.length ? data : undefined
    return (data === null || data === undefined) && resolve !== undefined ? resolve : data
  },

  /**
   * Remove the empty property of object.
   * @param {Object} object
   * @returns {Object}
   */
  clearEmpty (object) {
    let caches = []

    const _deepClear = (_object) => {
      if (!this.typeof(_object, 'object')) return object

      let index = caches.length

      while (index--) {
        if (_object === caches[index]) {
          return _object
        }
      }

      caches.push(_object)

      for (let key in _object) {
        if (_object[key] === null || _object[key] === undefined || _object[key] === '') {
          delete _object[key]
          continue
        }

        _deepClear(_object[key])
      }

      return _object
    }

    return _deepClear(object)
  },

  /**
   * Removes whitespace from both ends of a string.
   * @param {String} data target string.
   */
  trim (data) {
    if (this.typeof(data) !== 'string') return ''

    return data.toString().replace(/(^\s+)|(\s+$)/g, '')
  }
}
