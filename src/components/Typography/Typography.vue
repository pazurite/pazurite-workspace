<template>
  <component :is="component" v-bind="internalProps" v-on="$listeners">
    <slot>
      {{ value }}
    </slot>
  </component>
</template>

<script>
export default {
  props: {
    size: { type: String, default: '' },
    component: { type: String, default: 'p' },
    name: { type: String, default: '' },
    color: { type: String, default: 'anchor-gray-2' },
    bgcolor: { type: String, default: 'transparent' },
    borderColor: { type: String, default: 'transparent' },
    fontWeight: { type: String, default: '' },
    fontFamily: { type: String, default: '' },
    formatter: { type: String, default: '' },
    formatterOptions: { type: Object, default: () => {} },
    opacity: { type: Number, default: null },
    alignment: { type: String, default: '' },
    whiteSpace: { type: String, default: '' },
    wordBreak: { type: String, default: '' },
    lineHeight: { type: [String, Number], default: '' },
    letterSpacing: { type: [String, Number], default: '' },
    value: { type: [String, Number], default: '' },
    lines: { type: [String, Number], default: '' },
    disabled: Boolean,
    clickable: Boolean,
    ellipsis: Boolean,
    uppercase: Boolean,
    flex: Boolean,
    block: Boolean,
    underline: Boolean,
  },
  computed: {
    internalProps() {
      return {
        class: {
          'base-typography': true,
          [`color--${this.color}`]: true,
          [`bgcolor--${this.bgcolor}`]: true,
          [`border-color--${this.borderColor}`]: true,
          [`fs--${this.variant}`]: true,
          [`font-weight--${this.fontWeight}`]: true,
          [`font-family--${this.fontFamily}`]: true,
          [`white-space--${this.whiteSpace}`]: true,
          [`word-break--${this.wordBreak}`]: true,
          [`alignment--${this.alignment}`]: true,
          ellipsis: !!this.ellipsis,
          uppercase: !!this.uppercase,
          disabled: !!this.disabled,
          clickable: !!this.clickable,
          flex: !!this.flex,
          block: !!this.block,
          underline: !!this.underline,
        },
        style: {
          opacity: this.opacity,
          lineHeight: this.lineHeight,
          letterSpacing: this.letterSpacing,
        },
      };
    },
  },
};
</script>
