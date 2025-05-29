<template>
  <button class="j-button jelly-flex" ref="thisRef" j-type="JellyHTMLButtonElement">
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
import type { JColor, JellyHTMLButtonElement } from '../'
import { addJellyElement } from '../'

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
    default: '',
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
    type: (Boolean||String) as PropType<boolean | string>,
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
    thisRef.value.style.width = props.width
    thisRef.value.style.height = props.height
    if (props.jSelector) {
      addJellyElement(props.jSelector, thisRef.value)
    }
    if (thisRef.value.querySelector('.j-button__start')?.innerHTML === '') {
      hasStartSlot.value = false
    }
    if (thisRef.value.querySelector('.j-button__end')?.innerHTML === '') {
      hasEndSlot.value = false
    }
    if (props.disabled) {
      thisRef.value.disable(typeof props.disabled == 'string' ? props.disabled : '已禁用')
    }
    if (props.color) {
      thisRef.value.changeColor(props.color)
    }
  } else {
    console.error('JButton: 实例初始化失败')
  }
})
</script>