<template>
  <q-radio v-bind="$attrs">
    <template #default>
      <div class="q-radio__label">
        <slot />
      </div>
    </template>
  </q-radio>
</template>

<script>
export default {
  name: 'uiRadio',
  inheritAttrs: false,
}
</script>
