<template>
  <q-page class="flex flex-center">
    <div>
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
      <hr />
      {{ shape }}
      <div class="q-gutter-sm">
        <ui-radio v-model="shape" val="line">Line</ui-radio>
        <q-radio v-model="shape" val="rectangle" label="Rectangle" />
        <q-radio v-model="shape" val="ellipse" label="Ellipse" />
        <q-radio v-model="shape" val="polygon" label="Polygon" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const shape = ref('line')
</script>
