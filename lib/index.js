import BeeAlert from './alert'
import BeeAlias from './alias'
import BeeBreadcrumb from './breadcrumb'
import BeeButton from './button'
import BeeCascader from './cascader'
import BeeCheckbox from './checkbox'
import BeeDialog from './dialog'
import BeeDrawer from './drawer'
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
import BeeTree from './tree'

const modules = [
  BeeAlert,
  BeeBreadcrumb,
  BeeButton,
  BeeCascader,
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
  BeeToolTip,
  BeeDrawer,
  BeeAlias,
  BeeTree
]

export { BeeAlert, BeeBreadcrumb, BeeButton, BeeCascader, BeeCheckbox, BeeDialog, BeeEmpty, BeeIcon, BeeInput, BeeLanguage, BeeLoading, BeeMessage, BeeNotify, BeePagination, BeePicker, BeePopper, BeeRadio, BeeRadioGroup, BeeScrollbar, BeeSelect, BeeStep, BeeSwitch, BeeTab, BeeTabItem, BeeTable, BeeTableColumn, BeeToolTip, BeeDrawer, BeeAlias, BeeTree }

export default {
  install: function (Vue, options) {
    modules.forEach((item) => {
      item.install(Vue, options)
    })
  }
}
