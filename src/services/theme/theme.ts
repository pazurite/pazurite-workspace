import { VueConstructor } from 'vue';
import { IStatement, scssToJS } from '@/devkit/scss-to-json';

class Theme {
  public variables: Array<IStatement>;

  constructor() {
    this.variables = scssToJS('./theme.scss');
  }
}

export const ThemeService = {
  install: (Vue: VueConstructor) => {
    Vue.prototype.$theme = new Theme();
  },
};
