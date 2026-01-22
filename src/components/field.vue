<template>
  <div ref="thisRef" class="j-field jelly-flex" j-type="JellyHTMLFieldElement" :j-selector="props.jSelector">
    <h3 class="j-field__title" v-if="props.title">
      {{ props.title }}
    </h3>
    <div ref="containerRef" class="j-field__container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, type PropType } from 'vue';
import type { JellyHTMLFieldElement } from '../types/jellyElement';
import type { JColor } from '../types/color';
import { initJellyElement } from '../types/jellyElements';

const thisRef = ref<JellyHTMLFieldElement>();
const containerRef = ref<HTMLDivElement>();

defineComponent({
  name: 'JField'
})

const props = defineProps({
  jSelector: {
    type: String as PropType<string>,
    default: 'nameless',
    required: false
  },
  width: {
    type: String as PropType<string>,
    default:'45% 80%',
    required: false
  },
  height: {
    type: String as PropType<string>,
    default:'max-content',
    required: false
  },
  title: {
    type: String as PropType<string>,
    default: '',
    required: false
  },
  color: {
    type: String as PropType<JColor>,
    default: '',
    required: false
  },
  direction: {
    type: String as PropType<'row' | 'column'>,
    default: 'row',
    required: false
  },
  wrap: {
    type: Boolean as PropType<boolean>,
    default: true,
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
  }
  if (containerRef.value) {
    containerRef.value.style.flexDirection = props.direction;
    containerRef.value.style.flexWrap = props.wrap ? 'wrap' : 'nowrap';
  }
})
</script>