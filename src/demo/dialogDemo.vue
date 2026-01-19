<template>
  <JDialog title="弹窗" j-selector="#dialog1" disable-backdrop-close width="60%" color="green">
    这是一个自定义颜色的弹窗
    <template #footer>
      <JButton j-selector="#closeDialogBtn1">
        关闭弹窗
      </JButton>
    </template>
  </JDialog>

  <JDialog title="弹窗" j-selector="#dialog2">
    这是一个弹窗
    <template #title>
      <JButton j-selector="#closeDialogBtn2">
        &#xE10A;
      </JButton>
    </template>
  </JDialog>

  <JField title="弹窗 Dialog">
    <JButton j-selector="#showDialogBtn1">
      弹窗
    </JButton>
    <JButton j-selector="#showDialogBtn2">
      可以通过点击背景关闭的弹窗
    </JButton>
  </JField>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getJellyElements, JButton, JDialog, JField, type JellyHTMLButtonElement, type JellyHTMLDialogElement } from '..';

onMounted(() => {
  const dialog1 = getJellyElements<JellyHTMLDialogElement>('#dialog1') as JellyHTMLDialogElement;
  const dialog2 = getJellyElements<JellyHTMLDialogElement>('#dialog2') as JellyHTMLDialogElement;
  const showDialogBtn1 = getJellyElements<JellyHTMLButtonElement>('#showDialogBtn1') as JellyHTMLButtonElement;
  const showDialogBtn2 = getJellyElements<JellyHTMLButtonElement>('#showDialogBtn2') as JellyHTMLButtonElement;

  showDialogBtn1.onclick = () => {
    showDialogBtn1.disable('已显示', 500)
    dialog1.show();
  }

  showDialogBtn2.onclick = () => {
    showDialogBtn2.disable('已显示', 500)
    dialog2.show();
  }


  const closeDialogBtn1 = getJellyElements<JellyHTMLButtonElement>('#closeDialogBtn1') as JellyHTMLButtonElement;
  const closeDialogBtn2 = getJellyElements<JellyHTMLButtonElement>('#closeDialogBtn2') as JellyHTMLButtonElement;

  closeDialogBtn1.onclick = () => {
    dialog1.close();
  }
  closeDialogBtn2.onclick = () => {
    dialog2.close();
  }

})

</script>

<style scoped>
.field {
  margin: 0;
}
</style>