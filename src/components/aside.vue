<template>
  <aside class="j-aside jelly-flex" ref="thisRef" j-type="JellyHTMLAsideElement" :j-selector="props.jSelector">
    <div class="j-aside__container">
      <div class="j-aside__container__title" v-if="hasTitleSlot">
        <h2 v-if="props.title">{{ props.title }}</h2>
        <slot name="title"></slot>
      </div>
      <div class="j-aside__container__content">
        <slot></slot>
      </div>
      <div class="j-aside__container__footer" v-if="hasFootSlot">
        <slot name="footer"></slot>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, type PropType } from 'vue'
import { initJellyElement, type JellyHTMLAsideElement } from '../'
import type { JColor } from '../types/color'

const thisRef = ref<JellyHTMLAsideElement>()

const hasTitleSlot = ref(true)
const hasFootSlot = ref(true)

defineComponent({
  name: 'JAside'
})

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
    required: false
  },
  sideWith: {
    type: String as PropType<string>,
    default: '',
    required: false
  },
  float: {
    type: Boolean as PropType<boolean>,
    default: false,
    required: false
  },
  jSelector: {
    type: String as PropType<string>,
    default: 'nameless',
    required: false
  },
  width: {
    type: String as PropType<string>,
    default: '200px',
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

const setLocation = (sideWith: HTMLElement): void => {
  const widths: string[] = props.width.split(' ')
  thisRef.value.setWidth(widths[0], widths[1]!)

  sideWith && thisRef.value.style.setProperty('--top', sideWith.offsetTop + 'px')
  !props.float && sideWith && (sideWith.style.marginLeft = parseInt(thisRef.value.style.getPropertyValue('--width')) + 20 + 'px')
  sideWith && sideWith != document.body && thisRef.value.style.setProperty('--left', sideWith.offsetLeft - (sideWith.computedStyleMap().get('margin-left') as CSSUnitValue).value + 'px')
  // sideWith && sideWith == document.body && thisRef.value.style.setProperty('--left', '0px')
  // console.log(sideWith.offsetLeft, sideWith.computedStyleMap().get('margin-left'))
  setTimeout(() => {
    sideWith && (thisRef.value.style.setProperty('--height', sideWith.offsetHeight > window.innerHeight ? '100vh' : (sideWith.offsetHeight + 'px')))
  }, 0);
}

onMounted(() => {
  if (thisRef.value) {
    initJellyElement(thisRef.value)

    props.color && thisRef.value.changeColor(props.color)

    if (thisRef.value.querySelector('.j-dialog__container__title')?.innerHTML === '') {
      hasTitleSlot.value = false
    }
    if (thisRef.value.querySelector('.j-dialog__container__footer')?.innerHTML === '') {
      hasFootSlot.value = false
    }

    const sideWith: HTMLElement = props.sideWith ? document.querySelector<HTMLElement>(props.sideWith) || document.body : document.body

    thisRef.value.sideWith = sideWith

    setTimeout(() => {
      sideWith && setLocation(sideWith)
    }, 500);
    let timer: number
    sideWith && window.addEventListener('resize', () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setLocation(sideWith)
      }, 500);
    })
    sideWith && sideWith == document.body && (thisRef.value.style.position = 'fixed');
    sideWith && sideWith != document.body && window.addEventListener('scroll', () => {
      if (window.scrollY > sideWith.offsetTop && window.scrollY < sideWith.offsetTop + sideWith.offsetHeight) {
        thisRef.value.style.setProperty('--top', window.scrollY + 'px')
      }
      if (window.scrollY > sideWith.offsetTop && window.scrollY + window.innerHeight > sideWith.offsetTop + sideWith.offsetHeight) {
        thisRef.value.style.setProperty('--height', sideWith.offsetTop + sideWith.offsetHeight - window.scrollY + 'px')
      }
      if (window.scrollY < sideWith.offsetTop && window.scrollY + window.innerHeight < sideWith.offsetTop + sideWith.offsetHeight) {
        thisRef.value.style.setProperty('--height', window.scrollY + window.innerHeight - sideWith.offsetTop + 'px')
      }
    })

  } else {
    console.error('JAside: 实例初始化失败')
  }
})
</script>
