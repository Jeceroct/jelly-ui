<template>
  <dialog class="j-dialog j-dialog--close jelly-flex" ref="thisRef" j-type="JellyHTMLDialogElement" :j-selector="props.jSelector">
    <!-- <div class="j-dialog__bg"></div> -->
    <div class="j-dialog__container">
      <div class="j-dialog__container__title" v-if="hasTitleSlot">
        <h2 v-if="props.title">{{ props.title }}</h2>
        <slot name="title"></slot>
      </div>
      <div class="j-dialog__container__content">
        <slot></slot>
      </div>
      <div class="j-dialog__container__footer" v-if="hasFootSlot">
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, type PropType } from 'vue';
import { type JColor, type JellyHTMLDialogElement, initJellyElement } from '../'

const thisRef = ref<JellyHTMLDialogElement>()

// const isDisabled = thisRef.value?.disabled
const hasTitleSlot = ref(true)
const hasFootSlot = ref(true)

defineComponent({
  name: 'JButton'
})

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
    required: false
  },
  // showWhen: {
  //   type: [String, Boolean] as PropType<string | boolean>,
  //   default: false,
  //   required: true
  // },
  disableBackdropClose: {
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
    default: '40% 60%',
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

// const emit = defineEmits(['update:showWhen']);

onMounted(() => {
  if (thisRef.value) {
    initJellyElement(thisRef.value)

    // props.showWhen ? thisRef.value.show() : thisRef.value.close()
    // watch(() => props.showWhen, (newVal) => {
    //   if (newVal) {
    //     thisRef.value?.show()
    //   } else {
    //     thisRef.value?.close()
    //   }
    // })
    const widths: string[] = props.width.split(' ')
    thisRef.value.setWidth(widths[0], widths[1]!)
    const heights: string[] = props.height.split(' ')
    thisRef.value.setHeight(heights[0], heights[1]!)

    if (props.color) {
      thisRef.value.changeColor(props.color)
    }

    if (thisRef.value.querySelector('.j-dialog__container__title')?.innerHTML === '') {
      hasTitleSlot.value = false
    }
    if (thisRef.value.querySelector('.j-dialog__container__footer')?.innerHTML === '') {
      hasFootSlot.value = false
    }

    if (!props.disableBackdropClose) {
      thisRef.value.addEventListener('click', (e) => {
        if (e.target === thisRef.value) {
          thisRef.value.close()
          // emit('update:showWhen', false)
        }
      })
    }

  } else {
    console.error('JDialog: 实例初始化失败')
  }
})
</script>