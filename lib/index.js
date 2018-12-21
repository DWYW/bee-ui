import BeeButton from './button'
import BeeIcon from './icon'
import BeeInput from './input'
import { BeeRadio, BeeRadioGroup } from './radio'
import { BeeCheckbox } from './checkbox'
import BeeDialog from './dialog'
import BeeMenu from './menu'
import BeeSelect from './select'
import BeePicker from './picker'
import { BeeTable, BeeTableColumn } from './table'
import BeeSwitch from './switch'
import BeeStep from './step'
import BeePagination from './pagination'
import BeeBreadCrumb from './breadcrumb'
import BeeToolTip from './tooltip'
import BeeLoading from './loading'

import BeeMessage from './message'
import BeeNotify from './notify'
import BeeAlert from './alert'
import BeeTip from './tip'

const components = [
  BeeButton,
  BeeIcon,
  BeeInput,
  BeeRadio,
  BeeRadioGroup,
  BeeCheckbox,
  BeeDialog,
  BeeMenu,
  BeeSelect,
  BeePicker,
  BeeTable,
  BeeTableColumn,
  BeeSwitch,
  BeeStep,
  BeePagination,
  BeeBreadCrumb,
  BeeToolTip
]

const plugins = [
  BeeMessage,
  BeeNotify,
  BeeAlert,
  BeeTip,
  BeeLoading
]

const install = function (Vue) {
  if (install.installed) return false

  components.forEach((component) => {
    Vue.component(component.name, component)
  })

  plugins.forEach((plugin) => {
    Vue.use(plugin)
  })
}

export {
  BeeButton,
  BeeIcon,
  BeeInput,
  BeeRadio,
  BeeRadioGroup,
  BeeCheckbox,
  BeeDialog,
  BeeMenu,
  BeeSelect,
  BeePicker,
  BeeTable,
  BeeTableColumn,
  BeeSwitch,
  BeeStep,
  BeePagination,
  BeeBreadCrumb,
  BeeToolTip,
  BeeMessage,
  BeeNotify,
  BeeAlert,
  BeeTip,
  BeeLoading
}

export default install
