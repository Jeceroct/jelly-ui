<template>
  <JField j-selector="buttonField" title="按钮 Button">
    <JButton j-selector="#button1 .button">
      按钮
    </JButton>
    <JButton j-selector="#button2 .button" disabled="禁用的按钮">
      按钮
    </JButton>
    <JButton j-selector="#button3 .button" color="red">
      颜色值为红色的按钮
    </JButton>
    <JButton j-selector="#button4 .button" color="#ff0000">
      颜色值为自定义hex的按钮
    </JButton>
    <JButton j-selector="#button5 .button" color="rgb(255, 0, 0)">
      颜色值为自定义rgb的按钮
    </JButton>
    <p>使用button.changeColor方法动态地改变按钮颜色</p>
    <JButton j-selector="#button6 .button">
      一个变色的按钮
    </JButton>
    <JButton j-selector="#button7 .button">
      附带加载反馈的按钮
    </JButton>
    <p>带前后缀的按钮</p>
    <JButton j-selector="#button8 .button">
      按钮
      <template #start>
        前缀
      </template>
      <template #end>
        后缀
      </template>
    </JButton>
  </JField>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { getJellyElements, getJellyElementsAll, JButton, JField, type JColor, type JellyHTMLButtonElement } from '../';

onMounted(() => {
  const buttons = getJellyElementsAll<JellyHTMLButtonElement>('.button')
  const button1 = getJellyElements<JellyHTMLButtonElement>('#button1')
  const button3 = getJellyElements<JellyHTMLButtonElement>('#button3')
  const button4 = getJellyElements<JellyHTMLButtonElement>('#button4')
  const button5 = getJellyElements<JellyHTMLButtonElement>('#button5')
  const button6 = getJellyElements<JellyHTMLButtonElement>('#button6')
  const button7 = getJellyElements<JellyHTMLButtonElement>('#button7')
  if (!buttons || !button1 || !button3 || !button4 || !button5 || !button6 || !button7) {
    return
  }
  buttons.forEach(button => {
    button.setWidth('45%')
  })
  button3.onclick = () => {
    button3.disable('color="red"', 1500)
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
      button7.enable('加载完成', 'rgba(0, 255, 0, 0.6)')
    }, 2000)
  }
})

</script>

<style scoped>
p {
  width: 100%;
  height: max-content;
  margin: 5px 0;
}
</style>
