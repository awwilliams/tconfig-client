import Vue from 'vue';
import VueRouter from 'vue-router';
import Tconfig from '../components/Tconfig.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'TConfig',
      component: Tconfig,
    },
  ],
});

export default router;
