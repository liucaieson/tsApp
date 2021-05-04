import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/mainLayout',
      routes: [
        { path: '/', redirect: '/hdp' },
        { path: '/hdp', component: 'HDP', exact: true},
        { path: '/correctScore', component: 'CorrectScore', exact: true},
      ],
      exact: true
    },
    {
      path: '/exception',
      component: '@/layouts/blockLayout',
      routes: [
        { path: '/', redirect: '/401' },
        { path: '/401', component: '401', exact: true},
      ],
      exact: true
    },
    { path: '/', component: '404',  exact: true },
  ],
  dva: {
    immer: true,
    hmr: true,
  },
  fastRefresh: {},
  locale: {
    default: 'zh',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  favicon: '/assets/favicon.ico',
});
