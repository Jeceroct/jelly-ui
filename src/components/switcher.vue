<template>
  <div ref="thisRef" class="j-switcher jelly-ui" :j-selector="props.jSelector" j-type="JellyHTMLSwitcherElement" :multi="props.multiple.length > 0">
    <input v-model="value" type="checkbox" :name="props.name" :id="props.id" class="j-switcher-input"
      v-if="props.multiple.length == 0">
    <template v-if="props.multiple.length > 0">
      <input type="radio" :name="props.name" :id="`${props.id}_${index}`" class="j-switcher-input" :value="item.value"
        v-for="item, index in props.multiple" :key="index">
    </template>
    <div class="j-switcher__disable-text">已禁用</div>
    <label :for="props.id" class="j-switcher-label jelly-ui" :id="`${props.id}__label`" :title="props.name"
      :color="props.color">
      <span class="j-switcher__text j-switcher__text--checked" v-if="props.multiple.length == 0">{{ props.checkedText
      }}</span>
      <div class="j-switcher__switcher"></div>
      <span class="j-switcher__text j-switcher__text--unchecked" v-if="props.multiple.length == 0">{{
        props.uncheckedText }}</span>

      <div class="j-switcher__multiple" v-for="item, index in props.multiple" :key="index">
        <label :for="`${props.id}_${index}`" class="j-switcher__text">{{ item.title }}</label>
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref, watch, type PropType } from 'vue';
import { type JColor, initJellyElement, type JellyHTMLSwitcherElement, type JSwitcherGroup } from '../';

const thisRef = ref<JellyHTMLSwitcherElement>()

defineComponent({
  name: 'JSwitcher'
})

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
    required: false
  },
  name: {
    type: String as PropType<string>,
    default: '',
    required: true
  },
  id: {
    type: String as PropType<string>,
    default: '',
    required: true
  },
  checkedText: {
    type: String as PropType<string>,
    default: '开',
    required: false
  },
  uncheckedText: {
    type: String as PropType<string>,
    default: '关',
    required: false
  },
  checkedColor: {
    type: String as PropType<JColor>,
    default: '',
    required: false
  },
  callback: {
    type: Function as PropType<(isChecked: boolean) => void>,
    default: () => { },
    required: false
  },
  modelValue: {
    type: [Boolean, String] as PropType<boolean | string>,
    default: false,
    required: false
  },
  multiple: {
    type: Array as PropType<JSwitcherGroup>,
    default: [],
    required: false
  },
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
    default: '40px',
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

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})

const emit = defineEmits(['update:modelValue', 'enter', 'paste', 'submit'])

const multiChosenValue = ref('')
watch(multiChosenValue, (newValue, oldValue) => {
  if (newValue != oldValue) {
    value.value = newValue;
  }
})

onMounted(() => {
  if (props.name === '') {
    throw new Error('JSwitcher: 必须为组件指定name属性');
  }
  if (props.id === '') {
    throw new Error('JSwitcher: 必须为组件指定id属性');
  }
  const switcherInputs = document.querySelectorAll(`input[name="${props.name}"]`) as NodeListOf<HTMLInputElement>;
  const label = document.getElementById(`${props.id}__label`) as HTMLLabelElement;

  if (thisRef.value) {
    initJellyElement(thisRef.value)
    const widths: string[] = props.width.split(' ')
    thisRef.value.setWidth(widths[0], widths[1]!)
    const heights: string[] = props.height.split(' ')
    thisRef.value.setHeight(heights[0], heights[1]!)
    if (typeof props.disabled == 'string') {
      thisRef.value.disable(props.disabled != '' ? props.disabled : '已禁用')
    }
    if (props.color) {
      thisRef.value.changeColor(props.color)
    }

    const _changeHandler = () => {
      const switcher = label.querySelector('.j-switcher__switcher') as HTMLElement;
      if (switcherInputs[0].checked) {
        label.classList.add('j-switcher--checked');
        const text = label.querySelector('.j-switcher__text--checked') as HTMLElement;
        switcher.style.transition = 'unset';
        text.style.transition = 'unset';
        switcher.style.setProperty('--beforeLeft', label.getBoundingClientRect().height - label.getBoundingClientRect().width + 'px')
        text.style.setProperty('--beforeLeft', label.getBoundingClientRect().width - label.getBoundingClientRect().height + 'px')
        props.checkedColor && thisRef.value?.changeColor(props.checkedColor)
        setTimeout(() => {
          switcher.style.transition = 'all 0.3s ease';
          switcher.style.setProperty('--beforeLeft', '0px')
          text.style.transition = 'all 0.3s ease';
          text.style.setProperty('--beforeLeft', '0px')
        }, 0);
      } else {
        label.classList.remove('j-switcher--checked');
        const text = label.querySelector('.j-switcher__text--unchecked') as HTMLElement;
        switcher.style.transition = 'unset';
        text.style.transition = 'unset';
        switcher.style.setProperty('--beforeLeft', label.getBoundingClientRect().width - label.getBoundingClientRect().height + 'px')
        text.style.setProperty('--beforeLeft', label.getBoundingClientRect().height - label.getBoundingClientRect().width + 'px')
        props.checkedColor && (props.color ? thisRef.value?.changeColor(props.color) : thisRef.value?.changeColor(document.documentElement.computedStyleMap().get("--theme")?.toString() as JColor))
        setTimeout(() => {
          switcher.style.transition = 'all 0.3s ease';
          switcher.style.setProperty('--beforeLeft', '0px')
          text.style.transition = 'all 0.3s ease';
          text.style.setProperty('--beforeLeft', '0px')
        }, 0);
      }
      props.callback && props.callback(switcherInputs[0].checked)
    }


    if (props.multiple.length > 0) {
      const switcher = thisRef.value?.querySelector('.j-switcher__switcher') as HTMLElement;
      switcher.classList.add('j-switcher__switcher--multiple')
      const eles = thisRef.value?.querySelectorAll('.j-switcher__multiple') as NodeListOf<HTMLElement>;
      let chosenIndex = -1;
      // eles.forEach((item, index) => {
      //   item.addEventListener('click', () => {
      //     switcherInputs.forEach( (item) => {
      //       item.checked = false;
      //     })
      //     switcherInputs[index].checked = true;
      //   })
      // })
      switcherInputs.forEach((item, index) => {
        item.addEventListener('change', () => {
          if (!item.checked) return;
          chosenIndex = index;
          multiChosenValue.value = props.multiple[index].value as string;
          switcher.style.setProperty('--left', eles[index].getBoundingClientRect().left - label.getBoundingClientRect().left + 'px');
          switcher.style.setProperty('--width', eles[index].getBoundingClientRect().width + 'px');
          props.multiple[index].callback && props.multiple[index].callback(props.multiple[index].value)
        })
      })
      if (typeof props.modelValue == 'string') {
        chosenIndex = props.multiple.findIndex(item => item.value == props.modelValue)
        if (chosenIndex == -1) {
          throw new Error(`JSwitcher: 值"${props.modelValue}"不在多值列表中`);
        }
        switcherInputs[chosenIndex].checked = true;
        switcherInputs[chosenIndex].dispatchEvent(new Event('change'));
      }
    } else {
      switcherInputs[0].addEventListener('change', () => {
        _changeHandler()
      });
      
    }

    switcherInputs.length == 1 && _changeHandler()
  } else {
    console.error('JSwitcher: 实例初始化失败')
  }
})
</script>