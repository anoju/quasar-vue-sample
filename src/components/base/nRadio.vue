<template>
  <q-radio
    ref="radioEl"
    v-bind="$attrs"
    @click="handleClick"
    :aria-label="labelText"
    :label="label"
  >
    <template #default v-if="hasDefaultSlot">
      <slot />
    </template>
  </q-radio>
</template>

<script setup>
import { ref, defineProps, onMounted, onBeforeUnmount, useSlots, computed, nextTick } from 'vue'

defineOptions({
  name: 'uiRadio',
  inheritAttrs: false,
})

const props = defineProps({
  label: {
    type: [String, Number],
    default: null,
  },
})

const radioEl = ref(null)
const slots = useSlots()

const hasDefaultSlot = computed(() => {
  return !!slots.default && slots.default().length > 0
})

const getSlotText = (children) => {
  return children
    .map((node) => {
      if (!node.children || typeof node.children === 'string') return node.children || ''
      else if (Array.isArray(node.children)) return getSlotText(node.children)
      else if (node.children.default) return getSlotText(node.children.default())
    })
    .join('')
}

const labelText = computed(() => {
  return slots.default ? getSlotText(slots.default()) : props.label ? props.label : null
})

const labelAriaHidden = (element) => {
  const label = element.querySelector('.q-radio__label')
  if (label) {
    label.setAttribute('aria-hidden', 'true')
    label.setAttribute('tabindex', '-1')
    label.setAttribute('iner', 'true')
  }
  const outline = element.querySelector('.no-outline')
  if (outline) outline.setAttribute('aria-hidden', 'true')
}
const handleAfterMount = async () => {
  await nextTick()
  labelAriaHidden(radioEl.value.$el)
}

const handleClick = (e) => {
  console.log('click', e.target)
}

onMounted(() => {
  handleAfterMount()
  document.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
})
</script>
