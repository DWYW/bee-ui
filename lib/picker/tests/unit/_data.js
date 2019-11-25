export const quickBtns = [{
  label: '今天',
  value: new Date()
}, {
  label: '最近30天',
  value: [new Date(new Date().getTime() - 30 * 24 * 3600 * 1000), new Date()]
}, {
  label: '一个月后',
  value: new Date(new Date().getTime() + 30 * 24 * 3600 * 1000)
}]
