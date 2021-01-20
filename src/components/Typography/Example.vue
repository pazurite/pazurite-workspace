<template>
  <component :is="component" v-clamp="lines" v-bind="internalProps" v-on="$listeners">
    <slot>
      {{ value | textFormat(formatter, formatterOptions) }}
    </slot>
  </component>
</template>

<script>
import enumProps from '@/utils/enumProps';
import { textFormat } from '@/utils/formatter';
import excludeProps from '@/utils/excludeProps';
import clamp from '@/directives/clamp';

//TODO: Dynamic get typeScales and weights from sass files
// import { typeScales as rawTypeScales, weights as rawWeights } from '@/styles/_export.scss';

// const typeScales = JSON.parse(rawTypeScales.substring(1, rawTypeScales.length - 1));
// const fontWeights = JSON.parse(rawWeights.substring(1, rawWeights.length - 1));

const typeScales = {
  subtitle: '1.6',
  caption: '1',
  'body-small': '1.2',
  'body-medium': '1.4',
  'body-large': '1.8',
  'heading-3': '1.6',
  'heading-2': '1.8',
  'heading-1': '2.2',
  'heading-0': '2.4',
  'pica-0': '2.8',
  'title-1': '4',
  'title-2': '3.2',
  'title-3': '2',
  'title-4': '3',
  large: '2',
  micro: '1.4',
  'micro-1': '1.4',
  'micro-2': '1.2',
  atomic: '1.6',
  'atomic-1': '1.4',
  jumbo: '4.5',
  impact: '5',
};
const fontWeights = {
  thin: '100',
  'extra-light': '200',
  'ultra-light': '200',
  light: '300',
  normal: '400',
  book: '400',
  regular: '400',
  medium: '500',
  'semi-bold': '600',
  'demi-bold': '600',
  bold: '700',
  'extra-bold': '800',
  'ultra-bold': '900',
  heavy: '900',
  black: '900',
  ultra: '900',
  'ultra-black': '900',
  'extra-ultra': '900',
};

export default {
  directives: {
    clamp,
  },
  filters: {
    textFormat,
  },
  props: {
    variant: enumProps(Object.keys(typeScales), 'heading-3'),
    component: excludeProps(['router-link'], 'div'),
    name: { type: String, default: '' },
    color: { type: String, default: 'anchor-gray-2' },
    bgcolor: { type: String, default: 'transparent' },
    borderColor: { type: String, default: 'transparent' },
    fontWeight: enumProps(Object.keys(fontWeights), 'regular'),
    fontFamily: enumProps(['montserrat', 'helvetica'], 'montserrat'),
    formatter: enumProps(['number', 'currency', 'percent', 'area', 'short-date', 'date']),
    formatterOptions: { type: Object, default: () => {} },
    opacity: { type: Number, default: null },
    alignment: enumProps(['left', 'center', 'right']),
    whiteSpace: enumProps(
      ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'initial', 'inherit'],
      'normal'
    ),
    wordBreak: enumProps(
      ['normal', 'break-all', 'keep-all', 'break-word', 'initial', 'inherit'],
      'normal'
    ),
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

<style lang="scss" scoped>
.base-typography {
  transition: 200ms $ease-in-quad;
  text-decoration: none;
  text-transform: none;
  position: relative;
  z-index: map-get($z-layers, text);
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
