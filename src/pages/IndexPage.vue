<template>
  <q-page class="flex flex-center">
    <div>
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      />
      <hr />
      {{ rdoVal }}
      <div class="q-gutter-sm">
        <ui-radio v-model="rdoVal" val="line" label="Line" />
        <q-radio v-model="rdoVal" val="rectangle" label="Rectangle" />
        <q-radio v-model="rdoVal" val="ellipse" label="Ellipse" />
        <q-radio v-model="rdoVal" val="polygon" label="Polygon" />
      </div>

      <br />
      <q-select v-model="selVal" :options="selOpts" label="Standard" />
      <br />
      <br />

      <!-- 방법 1: 자동 변환 (강력한 방법) -->
      <q-input v-model="inputVal" label="이름" filled />
      <br />
      <br />
      <div>마지막 컨텐츠</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const rdoVal = ref('line')
const selVal = ref(null)
const selOpts = ref(['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'])
const inputVal = ref(null)
</script>
