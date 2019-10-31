import { expect } from 'chai'
import helpers from '../../lib/utils/helpers'

describe('helpers.typeof', () => {
  it('undefinded', () => {
    expect(helpers.typeof()).to.eq('undefined')
    expect(helpers.typeof(undefined)).to.eq('undefined')
    expect(helpers.typeof(undefined, [])).to.eq('undefined')
    expect(helpers.typeof(undefined, 'undefined')).to.eq(true)
    expect(helpers.typeof(undefined, 'string')).not.to.eq(true)
  })

  it('null', () => {
    expect(helpers.typeof(null)).to.eq('null')
    expect(helpers.typeof(null, [])).to.eq('null')
    expect(helpers.typeof(null, 'null')).to.eq(true)
    expect(helpers.typeof(null, 'string')).not.to.eq(true)
  })

  it('string', () => {
    expect(helpers.typeof('')).to.eq('string')
    expect(helpers.typeof('', [])).to.eq('string')
    expect(helpers.typeof('', 'string')).to.eq(true)
    expect(helpers.typeof('', 'number')).not.to.eq(true)
  })

  it('number', () => {
    expect(helpers.typeof(100)).to.eq('number')
    expect(helpers.typeof(100, [])).to.eq('number')
    expect(helpers.typeof(100, 'number')).to.eq(true)
    expect(helpers.typeof(100, 'string')).not.to.eq(true)
  })

  it('boolean', () => {
    expect(helpers.typeof(true)).to.eq('boolean')
    expect(helpers.typeof(false)).to.eq('boolean')
    expect(helpers.typeof(true, [])).to.eq('boolean')
    expect(helpers.typeof(false, [])).to.eq('boolean')
    expect(helpers.typeof(true, 'boolean')).to.eq(true)
    expect(helpers.typeof(false, 'boolean')).to.eq(true)
    expect(helpers.typeof(true, 'string')).not.to.eq(true)
    expect(helpers.typeof(false, 'string')).not.to.eq(true)
  })

  it('array', () => {
    expect(helpers.typeof([])).to.eq('array')
    expect(helpers.typeof([], [])).to.eq('array')
    expect(helpers.typeof([], 'array')).to.eq(true)
    expect(helpers.typeof([], 'string')).not.to.eq(true)
  })

  it('object', () => {
    expect(helpers.typeof({})).to.eq('object')
    expect(helpers.typeof({}, {})).to.eq('object')
    expect(helpers.typeof({}, 'object')).to.eq(true)
    expect(helpers.typeof({}, 'string')).not.to.eq(true)
  })

  it('date', () => {
    expect(helpers.typeof(new Date())).to.eq('date')
    expect(helpers.typeof(new Date(), [])).to.eq('date')
    expect(helpers.typeof(new Date(), 'date')).to.eq(true)
    expect(helpers.typeof(new Date(), 'string')).not.to.eq(true)
  })

  it('function', () => {
    expect(helpers.typeof(() => {})).to.eq('function')
    expect(helpers.typeof(() => {}, [])).to.eq('function')
    expect(helpers.typeof(() => {}, 'function')).to.eq(true)
    expect(helpers.typeof(() => {}, 'string')).not.to.eq(true)
  })
})

describe('helpers.deepCopy', () => {
  it('simple', () => {
    expect(
      helpers.deepCopy()
    ).to.eq(undefined)

    let target

    let copy = helpers.deepCopy(target)
    target = null
    expect(copy).to.eq(undefined)

    copy = helpers.deepCopy(target)
    target = 'string'
    expect(copy).to.eq(null)

    copy = helpers.deepCopy(target)
    target = 100
    expect(copy).to.eq('string')

    copy = helpers.deepCopy(target)
    target = false
    expect(copy).to.eq(100)

    copy = helpers.deepCopy(target)
    target = true
    expect(copy).to.eq(false)

    copy = helpers.deepCopy(target)
    target = function () {
      return 1
    }
    expect(copy).to.eq(true)

    copy = helpers.deepCopy(target)
    target = function () {
      return 2
    }
    expect(copy()).to.eq(1)
  }),

  it('array deep copy', () => {
    let target = [1, 3]
    let copy = helpers.deepCopy(target)
    target[0] = 2
    expect(copy[0]).to.eq(1)

    let target1 = [
      [1, 34],
      [23, 32, [
        232
      ]]
    ]
    let copy1 = helpers.deepCopy(target1)
    target1[1][2][0] = 342
    expect(copy1[0][0]).to.eq(1)
    expect(copy1[1][2][0]).to.eq(232)
  })

  it('object deep copy', () => {
    let target = {
      a: 'a',
      b: 'b'
    }
    let copy = helpers.deepCopy(target)
    target.a = 'a1'
    expect(copy.a).to.eq('a')

    let target1 = {
      test: {
        test: {
          a: 1
        }
      }
    }
    let copy1 = helpers.deepCopy(target1)
    delete target1.test
    expect(copy1).to.property('test')
    expect(copy1.test.test.a).to.eq(1)
  })

  it('self deep copy', () => {
    let target = {
      test: {}
    }
    target.target = target
    let copy = helpers.deepCopy(target)
    delete target.target
    expect(copy).to.property('target')

    target = {
      a: {}
    }
    target.a.target = target
    let copy1 = helpers.deepCopy(target)
    target = null
    expect(copy1).to.property('a')

    target = {
      a: {
        b: {
          c: ''
        }
      }
    }
    target.a.target = target.a
    let copy2 = helpers.deepCopy(target)
    target = null
    expect(copy2.a.target).to.property('b')

    target = {
      a: {
        b: {
          c: ''
        }
      }
    }
    target.a.b.target = target.a
    let copy3 = helpers.deepCopy(target)
    target = null
    expect(copy3.a.b.target).to.property('b')
  })
})

describe('helpers.equal', () => {
  it('simple', () => {
    let a = {test: 1}
    let b = a

    expect(helpers.equal(a, b)).to.eq(true)
    expect(helpers.equal(undefined, undefined)).to.eq(true)
    expect(helpers.equal(null, null)).to.eq(true)
    expect(helpers.equal('string', 'string')).to.eq(true)
    expect(helpers.equal(0, 0)).to.eq(true)
    expect(helpers.equal(true, true)).to.eq(true)
    expect(helpers.equal(false, false)).to.eq(true)
    expect(helpers.equal(new Date(2019, 8, 22, 0, 0, 0), new Date(2019, 8, 22, 0, 0, 0))).to.eq(true)
    expect(helpers.equal([], [])).to.eq(true)
    expect(helpers.equal({}, {})).to.eq(true)

    expect(helpers.equal(undefined, null)).to.eq(false)
    expect(helpers.equal('string', 0)).to.eq(false)
    expect(helpers.equal(true, false)).to.eq(false)
    expect(helpers.equal(new Date(2019, 8, 22, 0, 0, 0), new Date(2019, 8, 22, 10, 0, 0))).to.eq(false)
    expect(helpers.equal([1], [2])).to.eq(false)
    expect(helpers.equal([1], [1, 2])).to.eq(false)
    expect(helpers.equal([1, 2, 4], [1, 2])).to.eq(false)
    expect(helpers.equal({ a: 'a' }, { b: 'b' })).to.eq(false)
    expect(helpers.equal({ a: 'a' }, { a: 'a', b: 'b' })).to.eq(false)
    expect(helpers.equal({ a: 'a', b: 'b' }, { a: 'a' })).to.eq(false)
  })

  it('mixed', () => {
    expect(helpers.equal(
      {
        a: 'string',
        b: true,
        c: [{
          a: 'a'
        }],
        e: {
          f: ['a', undefined, null, 100]
        }
      },
      {
        a: 'string',
        b: true,
        c: [{
          a: 'a'
        }],
        e: {
          f: ['a', undefined, null, 100]
        }
      }
    )).to.eq(true)

    expect(helpers.equal(
      {
        a: 'string',
        b: true,
        c: [{
          a: 'a'
        }],
        e: {
          f: ['a', undefined, null, 100]
        }
      },
      {
        a: 'string',
        b: true,
        c: [{
          a: 'a'
        }],
        e: {
          f: ['a', undefined, null, 100]
        },
        m: new Date(2019, 8, 22, 0, 0, 0)
      }
    )).to.eq(false)
  })
})

describe('helpers.getValueByPath', () => {
  it('unit', () => {
    const target = {
      a: {
        test: [{
          b: 0
        }]
      },
      b: 0
    }

    expect(helpers.getValueByPath(undefined, '')).to.eq(undefined)
    expect(helpers.getValueByPath(undefined, 'a.test')).to.eq(undefined)
    expect(helpers.getValueByPath(target, 'a')).not.to.eq(undefined)
    expect(helpers.getValueByPath(target, 'a.test')).not.to.eq(undefined)
    expect(helpers.getValueByPath(target, 'a.test[0]')).not.to.eq(undefined)
    expect(helpers.getValueByPath(target, 'a.test[0].b')).not.to.eq(undefined)
    expect(helpers.getValueByPath(target, 'b')).to.eq(0)
    expect(helpers.getValueByPath(target, 'b.test')).to.eq(undefined)
    expect(helpers.getValueByPath(target, 'b.test.t', 'test')).to.eq('test')
  })
})

describe('helpers.clearEmpty', () => {
  it('unit', () => {
    expect(helpers.clearEmpty(undefined)).to.eq(undefined)
    expect(helpers.clearEmpty(null)).to.eq(null)
    expect(helpers.clearEmpty('string')).to.eq('string')
    expect(helpers.clearEmpty(0)).to.eq(0)
    expect(helpers.clearEmpty([0])).to.have.length(1).to.contain(0)
    expect(helpers.clearEmpty({
      a: 'a',
      b: null,
      c: undefined,
      d: ''
    })).to.have.key('a').to.not.have.key('b')
  })
})

describe('helpers.trim', () => {
  it('unit', () => {
    expect(helpers.trim(null)).to.eq('')
    expect(helpers.trim(undefined)).to.eq('')
    expect(helpers.trim({})).to.eq('')
    expect(helpers.trim([])).to.eq('')
    expect(helpers.trim('   ')).to.eq('')
    expect(helpers.trim(' ab')).to.eq('ab')
    expect(helpers.trim('ab  ')).to.eq('ab')
    expect(helpers.trim(' a b  ')).to.eq('a b')
  })
})
