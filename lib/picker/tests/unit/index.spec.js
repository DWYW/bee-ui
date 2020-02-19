import { createWrapper, shallowMount } from "@vue/test-utils"
import { expect } from 'chai'
import Vue from 'vue'
import { delay } from "../../../../tests/helpers"
import BeeIcon from '../../../icon/_src/index.vue'
import BeeUI from '../../../index'
import BeePicker from '../../../picker/_src/index.vue'
import QuickButtons from '../../../picker/_src/quick-buttons.vue'
import dateHelper from '../../../utils/date'
import { quickBtns } from './_data'

function _createWrapper(options = {}) {
  return shallowMount(BeePicker, {
    stubs: {
      'bee-icon': BeeIcon,
      'quick-buttons': QuickButtons
    },
    ...options
  })
}

Vue.use(BeeUI)

describe(`\x1b[46m bee-picker \x1b[0m`, () => {
  describe(`The prop of "type"`, () => {
    const types = ['date', 'range', 'datetime', 'rangetime']

    types.forEach((_type) => {
      it(_type, () => {
        const wrapper = _createWrapper({
          propsData: {
            type: _type
          }
        })

        expect(wrapper.classes()).to.include(`bee-picker__${_type}`)
      })
    })
  })

  describe(`The prop of "format"`, () => {
    it(`[type=date] default format should be YYYY-MM-DD`, () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'date',
          value: new Date(2019, 1, 2, 0, 0, 0)
        }
      })
      expect(wrapper.find('.bee-picker--value-text').text()).to.eq('2019-02-02')
    })

    it(`[type=datetime] default format should be YYYY-MM-DD hh:mm:ss`, () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'datetime',
          value: new Date(2019, 1, 2, 0, 0, 0)
        }
      })
      expect(wrapper.find('.bee-picker--value-text').text()).to.eq('2019-02-02 00:00:00')
    })

    it(`[type=range] default format should be YYYY-MM-DD`, () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'range',
          value: [new Date(2019, 1, 2, 0, 0, 0), new Date(2019, 2, 2, 0, 0, 0)]
        }
      })
      expect(wrapper.find('.bee-picker--value-text').text()).to.eq('2019-02-02 至 2019-03-02')
    })

    it(`[type=rangetime] default format should be YYYY-MM-DD hh:mm:ss`, () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'rangetime',
          value: [new Date(2019, 1, 2, 0, 0, 0), new Date(2019, 2, 2, 0, 0, 0)]
        }
      })
      expect(wrapper.find('.bee-picker--value-text').text()).to.eq('2019-02-02 00:00:00 至 2019-03-02 00:00:00')
    })

    it(`custom format MM-DD-YYYY`, () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'rangetime',
          format: 'MM-DD-YYYY',
          value: [new Date(2019, 1, 2, 0, 0, 0), new Date(2019, 2, 2, 0, 0, 0)]
        }
      })
      expect(wrapper.find('.bee-picker--value-text').text()).to.eq('02-02-2019 至 03-02-2019')
    })
  })

  describe(`The prop of "labelFormat"`, () => {
    it(`customer format`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'date',
          value: new Date(2019, 1, 2, 0, 0, 0),
          labelFormat: (date) => {
            if (date.getFullYear() === 2019) {
              return 'someday in 2019'
            } else {
              return date.toString()
            }
          }
        }
      })
      expect(wrapper.find('.bee-picker--value-text').text()).to.eq('someday in 2019')

      wrapper.setProps({
        value: new Date(2018, 1, 2, 0, 0, 0)
      })
      await delay(10)
      expect(wrapper.find('.bee-picker--value-text').text()).to.contain('Fri Feb 02 2018 00:00:00')
    })
  })

  describe(`The prop of "disabled"`, () => {
    it(`cann't pick date`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          disabled: true
        }
      })
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper._pickerInstance).to.a('undefined')
    })

    it(`cann't pick before today`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          disabled: (date) => {
            return date.getTime() < Date.now()
          }
        }
      })

      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      const today = dateHelper.date2object(new Date())

      if (today.prevMonthDays > 0 || today.day > 1) {
        pickInstance.findAll('.date--item').at(0).trigger('click')
        expect(wrapper.find('.bee-picker--placeholder')).to.ok
      }
    })
  })

  describe(`The prop of "placeholder"`, () => {
    it(`placeholder should be empty`, () => {
      const wrapper = _createWrapper()
      expect(wrapper.find('.bee-picker--placeholder').text()).not.ok
    })

    it(`placeholder should be setted`, () => {
      const wrapper = _createWrapper({
        propsData: {
          placeholder: 'placeholder'
        }
      })
      expect(wrapper.find('.bee-picker--placeholder').text()).to.eq('placeholder')
    })
  })

  describe(`The prop of "timeDisabled"`, () => {
    it(`datetime`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'datetime',
          timeDisabled: {
            hour: (date, index) => {
              // do something ...
              return index > 2 ? [1] : [0]
            },
            minute: (date, index) => {
              // do something ...
              return index > 2 ? [1] : [0]
            },
            second: (date, index) => {
              // do something ...
              return index > 2 ? [1] : [0]
            }
          }
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })

      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      pickInstance.find('.change-to-time').trigger('click')

      pickInstance.findAll('.bee-picker-time--item').wrappers.forEach(wrapper => {
        expect(wrapper.findAll('.time-value--item').at(0).classes()).to.contain('time-value--item__disabled')
      })
    })

    it(`rangetime`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'rangetime',
          timeDisabled: {
            hour: (date, index) => {
              // do something ...
              return index > 2 ? [1] : [0]
            },
            minute: (date, index) => {
              // do something ...
              return index > 2 ? [1] : [0]
            },
            second: (date, index) => {
              // do something ...
              return index > 2 ? [1] : [0]
            }
          }
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })

      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      pickInstance.findAll('.date--item').at(1).trigger('click')
      pickInstance.find('.change-to-time').trigger('click')

      pickInstance.findAll('.bee-picker-time--item').wrappers.forEach((wrapper, key) => {
        expect(wrapper.findAll('.time-value--item').at(key > 2 ? 1 : 0).classes()).to.contain('time-value--item__disabled')
      })
    })
  })

  describe(`The prop of "timeVisible"`, () => {
    const wrapper = _createWrapper({
      propsData: {
        timeVisible: {
          hour: true,
          minute: true,
          second: false
        }
      }
    })

    it(`datetime time items length should be 2`, async () => {
      wrapper.setProps({
        type: 'datetime'
      })

      // open
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      pickInstance.find('.change-to-time').trigger('click')

      await delay(10)
      expect(pickInstance.findAll('.bee-picker-time--item').length).to.eq(2)
      // close for next
      wrapper.find('.bee-picker--value').trigger('click')
    })

    it(`rangetime time items length should be 4`, async () => {
      wrapper.setProps({
        type: 'rangetime'
      })

      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      pickInstance.findAll('.date--item').at(1).trigger('click')
      pickInstance.find('.change-to-time').trigger('click')

      await delay(10)
      expect(pickInstance.findAll('.bee-picker-time--item').length).to.eq(4)
      // close for next
      wrapper.find('.bee-picker--value').trigger('click')
    })
  })

  describe(`The prop of "defaultTime"`, () => {
    it(`date|datetime`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'date',
          defaultTime: {
            startHour: 1,
            startMinute: 2,
            startSecond: 3
          }
        }
      })
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      expect(pickInstance.vm.value.getHours()).to.eq(1)
      expect(pickInstance.vm.value.getMinutes()).to.eq(2)
      expect(pickInstance.vm.value.getSeconds()).to.eq(3)
      wrapper.find('.bee-picker--value').trigger('click')
    })

    it(`range|rangetime`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'range',
          defaultTime: {
            startHour: 1,
            startMinute: 2,
            startSecond: 3,
            endHour: 0,
            endMinute: 0,
            endSecond: 0
          }
        }
      })
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      pickInstance.findAll('.date--item').at(1).trigger('click')
      expect(pickInstance.vm.value[0].getHours()).to.eq(1)
      expect(pickInstance.vm.value[0].getMinutes()).to.eq(2)
      expect(pickInstance.vm.value[0].getSeconds()).to.eq(3)
      expect(pickInstance.vm.value[1].getHours()).to.eq(0)
      expect(pickInstance.vm.value[1].getMinutes()).to.eq(0)
      expect(pickInstance.vm.value[1].getSeconds()).to.eq(0)
      wrapper.find('.bee-picker--value').trigger('click')
    })
  })

  describe(`The prop of maxDays`, () => {
    it(`dealut`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          type: 'range',
          maxDays: 2
        }
      })
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok

      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      pickInstance.findAll('.date--item').at(4).trigger('click')
      await delay(10)
      expect(pickInstance.find('.bee-picker--days-overflow').isEmpty()).not.ok
      expect(pickInstance.vm.value).not.ok
    })
  })

  describe(`The prop of "autoChange"`, () => {
    it(`datetime`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          autoChange: true,
          type: 'datetime'
        }
      })

      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok
      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      await delay(200)
      expect(pickInstance.find('.bee-picker-time').isEmpty()).not.ok
    })

    it(`rangtime`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          autoChange: true,
          type: 'rangetime'
        }
      })

      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok
      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(0).trigger('click')
      pickInstance.findAll('.date--item').at(2).trigger('click')
      await delay(200)
      expect(pickInstance.find('.bee-picker-time').isEmpty()).not.ok
    })
  })

  describe(`The prop of quickBtns`, () => {
    it(`quickBtnsType is inner`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          quickBtns: quickBtns
        }
      })
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok
      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      expect(pickInstance.findAll('.bee-picker-quick-buttons--item').length).to.eq(2)
    })

    it(`quickBtnsType is outer`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          quickBtnsType: 'outer',
          quickBtns: quickBtns
        }
      })

      expect(wrapper.findAll('.bee-picker-quick-buttons--item').length).to.eq(2)
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      expect(wrapper.vm._pickerInstance).to.ok
      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      expect(pickInstance.findAll('.bee-picker-quick-buttons--item').length).to.eq(0)
    })
  })

  describe(`The events`, () => {
    it(`v-model`, async () => {
      const wrapper = _createWrapper({
        propsData: {
          placeholder: '请选择'
        },
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          }
        }
      })
      // the value is undefined, placeholder should be visible
      expect(wrapper.find('.bee-picker--placeholder').isVisible()).to.ok
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      const pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(10).trigger('click')
      await delay(10)
      expect(wrapper.props('value')).is.ok
      expect(wrapper.find('.bee-picker--value-text').text()).is.ok
    })

    it('change', async () => {
      let count = 0
      const wrapper = _createWrapper({
        listeners: {
          input: (value) => {
            wrapper.setProps({ value })
          },
          change: () => {
            count++
          }
        }
      })

      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      let pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(10).trigger('click')
      await delay(100)
      expect(count).to.eq(1)

      // click same
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(10)
      pickInstance = createWrapper(wrapper.vm._pickerInstance)
      pickInstance.findAll('.date--item').at(10).trigger('click')
      await delay(100)
      expect(count).to.eq(1)
    })

    it('beforeOpen', async () => {
      let count = 0
      const wrapper = _createWrapper({
        listeners: {
          beforeOpen: () => {
            count++
          }
        }
      })
      // open
      wrapper.find('.bee-picker--value').trigger('click')
      expect(count).to.eq(1)
      await delay(10)

      // close
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(200)
      expect(count).to.eq(1)
    })

    it('opened', async () => {
      let count = 0
      const wrapper = _createWrapper({
        listeners: {
          opened: () => {
            count++
          }
        }
      })
      // open
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(200)
      expect(count).to.eq(1)

      // close
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(200)
      expect(count).to.eq(1)
    })

    it('closed', async () => {
      let count = 0
      const wrapper = _createWrapper({
        listeners: {
          closed: () => {
            count++
          }
        }
      })

      // open
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(200)
      expect(count).to.eq(0)

      // close
      wrapper.find('.bee-picker--value').trigger('click')
      await delay(200)
      expect(count).to.eq(1)
    })

  })
})
