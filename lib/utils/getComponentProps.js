export default function (vNode) {
  let _component = new vNode.componentOptions.Ctor(vNode.componentOptions.propsData)

  return _component.$options._propKeys.reduce((target, key) => {
    if (_component.$options[key] !== undefined) {
      target[key] = _component.$options[key]
    }

    return target
  }, _component._props)
}
