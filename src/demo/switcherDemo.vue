<template>
  <JField title="开关 Switcher">
    <div id="switcherDemo">
      <JSwitcher name="开关" v-model="value1" :callback="enableCustomTheme" id="switcher1" color="red" checked-color="green"></JSwitcher>
      <JSwitcher v-if="ifShow" name="切换主题色" v-model="value2" id="switcher2" :multiple="group" checked-color="green"></JSwitcher>
      <JSwitcher name="禁用的开关" id="switcher3" width="150px" disabled="禁用的开关"></JSwitcher>
      <JSwitcher name="禁用的开关" id="switcher4" disabled="禁用的多值开关" :multiple="group"></JSwitcher>
    </div>
  </JField>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { J_ChangeThemeColor, JField, JSwitcher, type JColor, type JSwitcherGroup } from '..';

const value1 = ref(true)
const value2 = ref('yellow')
watch(value1, (newValue) => {
  console.log('outer', newValue)
})
watch(value2, (newValue) => {
  console.log('outer', newValue)
})

const ifShow = ref(false)

const enableCustomTheme = (value: boolean) => {
  ifShow.value = value;
}

const group: JSwitcherGroup = [
  {
    title: '红色',
    value: 'red',
    callback: (value) => {
      J_ChangeThemeColor(value as JColor)
    }
  },{
    title: '黄色',
    value: 'yellow',
    callback: (value) => {
      J_ChangeThemeColor(value as JColor)
    }
  },{
    title: '绿色',
    value: 'green',
    callback: (value) => {
      J_ChangeThemeColor(value as JColor)
    }
  },{
    title: '黑色',
    value: '#000000',
    callback: (value) => {
      J_ChangeThemeColor(value as JColor)
    }
  }
]
</script>