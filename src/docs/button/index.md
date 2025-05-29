# Button

## 基础用法
<demo src="./demo/button/base.vue" title="基础用法" desc="基础的按钮用法。">

<<< ../..//demo/buttonDemo.vue

</demo>

## attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| j-selector | JellyHTMLElement选择器 | string | - | - |
| color | 定义此按钮及其后代元素所使用的主题色 | JColor | 参见JColor类型 | - |
| width | 定义此按钮的width | string | 与css-width规则一致 | 'max-content' |
| height | 定义此按钮的height | string | 与css-height规则一致 | 'max-content' |
| disabled | 定义此按钮是否可用 | boolean / string | string值将使按钮不可用并显示内容 | false |