import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/performance',
  },
  {
    path: '/performance',
    name: 'performance',
    component: () =>
      import(
        /* webpackChunkName: "performance" */ '../views/performance/Main.vue'
      ),
  },
  {
    path: '/operate',
    name: 'operate',
    component: () =>
      import(/* webpackChunkName: "operate" */ '../views/operate/Main.vue'),
  },
  {
    path: '/slot',
    name: 'Slot',
    component: () =>
      import(/* webpackChunkName: "slot" */ '../views/slot/Main.vue'),
  },
  {
    path: '/fixed',
    name: 'fixed',
    component: () =>
      import(/* webpackChunkName: "fixed" */ '../views/fixed/Main.vue'),
  },
  {
    path: '/horizontal',
    name: 'horizontal',
    component: () =>
      import(
        /* webpackChunkName: "horizontal" */ '../views/horizontal/Main.vue'
      ),
  },
  {
    path: '/table',
    name: 'table',
    component: () =>
      import(/* webpackChunkName: "table" */ '../views/table/Main.vue'),
  },
  {
    path: '/editable',
    name: 'editable',
    component: () =>
      import(/* webpackChunkName: "editable" */ '../views/editable/Main.vue'),
  },
  {
    path: '/infinity',
    name: 'infinity',
    component: () =>
      import(/* webpackChunkName: "infinity" */ '../views/infinity/Main.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
