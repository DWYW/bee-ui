<template>
  <td>
    <slot></slot>
  </td>
</template>

<script>
export default {
  name: 'BeeTableColumn',
  props: {
    align: {
      type: String,
      default: 'center'
    },
    fixed: String,
    label: String,
    prop: String,
    placeholder: String,
    type: {
      type: String,
      validator: function (value) {
        return /^(general|selection)$/.test(value)
      },
      default: 'general'
    },
    width: {
      type: [Number, String],
      default: 75
    }
  }
}
</script>
