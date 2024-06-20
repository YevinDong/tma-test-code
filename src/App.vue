<script setup lang="ts">
import { Ref, ref } from "vue"
import { type Btns } from "./components/types";
import { initParticleReact } from "./components/particleReact";
import { initEnv } from "./components/initEnv";
import { initTma } from "./components/initTma"

const btnsRef: Ref<Btns[]> = ref([]);
const initList = [
  () => initEnv(),
  () => btnsRef.value = initTma(),
  () => initParticleReact({ element: document.getElementById('pnr')! })
]

initList.forEach(fn => fn())
</script>

<template>
  <div id="root">
    <button v-for="btn in btnsRef" :text="btn.text" @click="btn.cb" :class="'button is-' + btn.className">{{ btn.text
      }}</button>
    <input type="text" class="input is-danger is-rounded" placeholder="Input text">
  </div>
</template>

<style scoped>
#root {
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .3vw;
}

.button {
  width: 100%;
}
</style>
