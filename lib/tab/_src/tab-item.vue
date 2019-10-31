<template>
  <section class="bee-tab--item">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'BeeTabItem',
  props: {
    label: String
  }
}
</script>
