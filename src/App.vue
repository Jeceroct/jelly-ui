<template>
  <DialogDemo />
  <SwitcherDemo />
  <filedDemo />
  <buttonDemo />
  <AsideDemo />
</template>

<script lang="ts" setup>
import filedDemo from './demo/fieldDemo.vue'
import buttonDemo from './demo/buttonDemo.vue'
import { J_ChangeThemeColor, J_DefineBackgroundElement} from '.';
import { onMounted } from 'vue';
import SwitcherDemo from './demo/switcherDemo.vue';
import DialogDemo from './demo/dialogDemo.vue';
import AsideDemo from './demo/asideDemo.vue';

J_ChangeThemeColor('yellow')
J_DefineBackgroundElement(document.body)

onMounted(() => {
  // const fields = getJellyElementsAll<JellyHTMLFieldElement>('JellyHTMLFieldElement')
  // if (fields) {
  //   fields.forEach(field => {
  //     field.setWidth('45%', '80%')
  //   })
  // }
})
</script>

<style>
#app {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>