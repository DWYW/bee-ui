import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { delay } from "../../../../tests/helpers"
import BeeIcon from '../../../icon/_src/index.vue'
import BeeInput from '../../../input/_src/index.vue'

function _createWrapper(options = {}) {
  return shallowMount(BeeInput, {
    stubs: {
      'bee-icon': BeeIcon
    },
    ...options
  })
}

describe(`\x1b[46m bee-input \x1b[0m`, () => {
  describe(`The prop of "autofocus"`, async () => {
    it('is focus when mounted', async () => {
      let isFocused = false
      _createWrapper({
        propsData: {
          autofocus: true
        },
        listeners: {
          focus: () => {
            isFocused = true
          }
        }
      })

      await delay(100)
      expect(isFocused).to.ok
    })
  })

  describe(`The prop of "disabled"`, () => {
    const wrapper = _createWrapper({
      propsData: {
        disabled: true
      }
    })
    const input = wrapper.find('input')

    it(`the wrapper classes include "bee-input__disabled"`, () => {
      expect(wrapper.classes()).to.include('bee-input__disabled')
    })

    it(`the input element has disabled attribute`, () => {
      expect(input.attributes('disabled')).to.eq('disabled')
    })
  })

  describe(`The prop of "maxlength"`, () => {
    const wrapper = _createWrapper({
      propsData: {
        value: '123456',
        maxlength: 3
      },
      listeners: {
        input: (value) => {
          wrapper.setProps({ value })
        }
      }
    })
    const input = wrapper.find('input')

    it('init', () => {
      expect(input.element.value).to.eq('123')
    })

    it('value update', () => {
      input.setValue('dfdsdsf')
      expect(wrapper.props('value')).to.eq('dfd')
    })
  })

  describe(`The prop of "icon"`, () => {
    it(`the wrapper contains icon`, () => {
      const wrapper = _createWrapper({
        propsData: {
          icon: {
            position: 'left',
            icon: 'add'
          }
        }
      })
      expect(wrapper.contains(BeeIcon)).to.ok
    })

    it('icon position should be left', () => {
      const wrapper = _createWrapper({
        propsData: {
          icon: {
            position: 'left',
            icon: 'add'
          }
        }
      })
      expect(wrapper.classes()).to.include.members(['left--icon'])
    })

    it('icon positon should be right', () => {
      const wrapper = _createWrapper({
        propsData: {
          icon: {
            position: 'right',
            icon: 'add'
          }
        }
      })
      expect(wrapper.classes()).to.include.members(['right--icon'])
    })
  })

  describe(`The prop of "placeholder"`, () => {
    it('input must be has placeholder attribute and the value equal the setted', () => {
      const wrapper = _createWrapper({
        propsData: {
          placeholder: 'placeholder'
        }
      })
      expect(wrapper.find('input').attributes('placeholder')).to.eq('placeholder')
    })
  })

  describe(`The prop of "readonly"`, () => {
    it("input must be has readonly attribute", () => {
      const wrapper = _createWrapper({
        propsData: {
          readonly: true
        }
      })
      expect(wrapper.find('input').attributes('readonly')).to.eq('readonly')
    })
  })

  describe(`The prop of reg`, () => {
    it(`(regexp string) if the match failed return before`, () => {
      const wrapper = _createWrapper({
        propsData: {
          reg: '^\\d+$'
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })
      wrapper.find('input').setValue('dsfsdf')
      expect(wrapper.props('value')).to.eq('')
    })

    it(`(regexp string) if the match success return setted`, () => {
      const wrapper = _createWrapper({
        propsData: {
          reg: '^\\d+$'
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })
      wrapper.find('input').setValue('123')
      expect(wrapper.props('value')).to.eq('123')
    })

    it(`the reg type is RegExp`, () => {
      const wrapper = _createWrapper({
        propsData: {
          reg: /^\d+$/
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })
      wrapper.find('input').setValue('dsfsdf')
      expect(wrapper.props('value')).to.eq('')
    })

    it(`the reg type is Function`, () => {
      const wrapper = _createWrapper({
        propsData: {
          reg: (value) => {
            return /^\d+$/.test(value)
          }
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })
      wrapper.find('input').setValue('123')
      expect(wrapper.props('value')).to.eq('123')
    })
  })

  describe(`The prop of "theme"`, () => {
    // let wrapper = shallowMount(BeeInput)

    it(`default`, () => {
      const wrapper = _createWrapper()
      expect(wrapper.classes()).to.include('bee-input__default')
    })

    it(`primary`, () => {
      const wrapper = _createWrapper({
        propsData: {
          theme: 'primary'
        }
      })
      expect(wrapper.classes()).to.include('bee-input__primary')
    })

    it(`success`, () => {
      const wrapper = _createWrapper({
        propsData: {
          theme: 'success'
        }
      })
      expect(wrapper.classes()).to.include('bee-input__success')
    })

    it(`error`, () => {
      const wrapper = _createWrapper({
        propsData: {
          theme: 'error'
        }
      })
      expect(wrapper.classes()).to.include('bee-input__error')
    })
  })

  describe(`The prop of "type"`, () => {
    it('default type', () => {
      const wrapper = _createWrapper()
      expect(wrapper.find('input').attributes('type')).to.eq('text')
    })

    let types = [
      'button', 'checkbox', 'color',
      'date', 'datetime', 'datetime-local', 'email',
      'file', 'hidden', 'password', 'radio', 'reset',
      'submit'
    ]

    types.forEach((type) => {
      it(type, () => {
        const wrapper = _createWrapper({
          propsData: {
            type: type
          }
        })
        expect(wrapper.find('input').attributes('type')).to.eq(type)
      })
    })
  })

  describe('The events', () => {
    const events = ['click', 'change', 'mouseenter', 'mouseleave', 'enter']

    events.forEach((_event) => {
      it(`${_event}`, () => {
        let eventType = null
        let listeners = {}

        listeners[_event] = (e) => {
          if (_event === 'enter') {
            eventType = 'enter'
          } else {
            eventType = e.type
          }
        }

        const wrapper = _createWrapper({
          listeners: listeners
        })

        wrapper.find('input').trigger(_event)
        expect(eventType).to.eq(_event)
      })
    })
  })
})
