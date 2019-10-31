import BeeAlert from './alert'
import BeeBreadcrumb from './breadcrumb'
import BeeButton from './button'
import BeeCheckbox from './checkbox'
import BeeDialog from './dialog'
import BeeEmpty from './empty'
import BeeIcon from './icon'
import BeeInput from './input'
import BeeLanguage from './language'
import BeeLoading from './loading'
import BeeMessage from './message'
import BeeNotify from './notification'
import BeePagination from './pagination'
import BeePicker from './picker'
import BeePopper from './popper'
import { BeeRadio, BeeRadioGroup } from './radio'
import BeeScrollbar from './scrollbar'
import BeeSelect from './select'
import BeeStep from './step'
import BeeSwitch from './switch'
import { BeeTab, BeeTabItem } from './tab'
import { BeeTable, BeeTableColumn } from './table'
import BeeToolTip from './tooltip'

const modules = [
  BeeAlert,
  BeeBreadcrumb,
  BeeButton,
  BeeCheckbox,
  BeeDialog,
  BeeEmpty,
  BeeIcon,
  BeeInput,
  BeeLanguage,
  BeeLoading,
  BeeMessage,
  BeeNotify,
  BeePagination,
  BeePicker,
  BeePopper,
  BeeRadio,
  BeeRadioGroup,
  BeeScrollbar,
  BeeSelect,
  BeeStep,
  BeeSwitch,
  BeeTab,
  BeeTabItem,
  BeeTable,
  BeeTableColumn,
  BeeToolTip
]

export { BeeAlert, BeeBreadcrumb, BeeButton, BeeCheckbox, BeeDialog, BeeEmpty, BeeIcon, BeeInput, BeeLanguage, BeeLoading, BeeMessage, BeeNotify, BeePagination, BeePicker, BeePopper, BeeRadio, BeeRadioGroup, BeeScrollbar, BeeSelect, BeeStep, BeeSwitch, BeeTab, BeeTabItem, BeeTable, BeeTableColumn, BeeToolTip }

export default {
  install: function (Vue, options) {
    modules.forEach((item) => {
      item.install(Vue, options)
    })
  }
}
