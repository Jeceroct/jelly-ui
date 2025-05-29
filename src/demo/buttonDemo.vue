<template>
  <JButton j-selector="button1" width="150px">
    按钮
  </JButton>
  <JButton j-selector="button2" disabled="禁用的按钮" width="150px">
    按钮
  </JButton>
  <JButton j-selector="button3" color="red" width="200px">
    颜色值为红色的按钮
  </JButton>
  <JButton j-selector="button4" color="#ff0000" width="250px">
    颜色值为自定义hex的按钮
  </JButton>
  <JButton j-selector="button5" color="rgb(255, 0, 0)" width="250px">
    颜色值为自定义rgb的按钮
  </JButton>
  使用button.changeColor方法动态地改变按钮颜色
  <JButton j-selector="button6" width="250px">
    一个变色的按钮
  </JButton>
  <JButton j-selector="button7" width="250px">
    附带加载反馈的按钮
  </JButton>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { getJellyElements, JButton, type JColor, type JellyHTMLButtonElement } from '../';

onMounted(() => {
  const button1 = getJellyElements<JellyHTMLButtonElement>('button1')
  const button3 = getJellyElements<JellyHTMLButtonElement>('button3')
  const button4 = getJellyElements<JellyHTMLButtonElement>('button4')
  const button5 = getJellyElements<JellyHTMLButtonElement>('button5')
  const button6 = getJellyElements<JellyHTMLButtonElement>('button6')
  const button7 = getJellyElements<JellyHTMLButtonElement>('button7')
  if (!button1 || !button3 || !button4 || !button5 || !button6 ||!button7) {
    return
  }
  button3.onclick = () => {
    button3.disable('color="red"',1500)
  }
  button4.onclick = () => {
    button4.disable('color="#ff0000"', 1500)
  }
  button5.onclick = () => {
    button5.disable('color="rgb(255, 0, 0)"', 1500)
  }
  let setIndex = 0
  const set = new Array<JColor>('black', 'pink', '#ffffd0')
  setInterval(() => {
    button6.changeColor(set[setIndex++ % set.length])
  }, 2000)
  button6.onclick = () => {
    button6.disable('过会再点吧', 3000)
  }
  button7.onclick = () => {
    button7.disable('加载中...')
    setTimeout(() => {
      button7.enable('加载完成', 'green')
    }, 2000)
  }
})

</script>

<style scoped></style>
