<template>
  <button class="j-button jelly-ui" ref="thisRef" j-type="JellyHTMLButtonElement" :j-selector="props.jSelector">
    <div class="j-button__before">已禁用</div>
    <div class="j-button__start" v-if="hasStartSlot">
      <slot name="start"></slot>
    </div>
    <div class="j-button__inner">
      <slot></slot>
    </div>
    <div class="j-button__end" v-if="hasEndSlot">
      <slot name="end"></slot>
    </div>
  </button>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, type PropType } from 'vue';
import { type JColor, type JellyHTMLButtonElement, initJellyElement } from '../'

const thisRef = ref<JellyHTMLButtonElement>()

// const isDisabled = thisRef.value?.disabled
const hasStartSlot = ref(true)
const hasEndSlot = ref(true)

defineComponent({
  name: 'JButton'
})

const props = defineProps({
  jSelector: {
    type: String as PropType<string>,
    default: 'nameless',
    required: false
  },
  width: {
    type: String as PropType<string>,
    default: 'max-content',
    required: false
  },
  height: {
    type: String as PropType<string>,
    default: 'max-content',
    required: false
  },
  disabled: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: false,
    required: false
  },
  color: {
    type: String as PropType<JColor>,
    default: '',
    required: false
  }
})


onMounted(() => {
  if (thisRef.value) {
    initJellyElement(thisRef.value)
    const widths: string[] = props.width.split(' ')
    thisRef.value.setWidth(widths[0], widths[1]!)
    const heights: string[] = props.height.split(' ')
    thisRef.value.setHeight(heights[0], heights[1]!)
    if (thisRef.value.querySelector('.j-button__start')?.innerHTML === '') {
      hasStartSlot.value = false
    }
    if (thisRef.value.querySelector('.j-button__end')?.innerHTML === '') {
      hasEndSlot.value = false
    }
    if (typeof props.disabled == 'string') {
      thisRef.value.disable(props.disabled != '' ? props.disabled : '已禁用')
    }
    if (props.color) {
      thisRef.value.changeColor(props.color)
    }
  } else {
    console.error('JButton: 实例初始化失败')
  }
})
</script>