import Vue from 'vue';
import Router from 'vue-router';
import Answers from './components/Answers.vue';
import Card from './components/Card.vue';
import Ping from './components/Ping.vue';
import HelloWorld from './components/HelloWorld.vue';
import Codemirror from './components/Codemirror.vue';
import Home from './components/Home.vue';
import Credits from './components/Credits.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/credits',
      name: 'Credits',
      component: Credits,
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/Codemirror',
      name: 'Codemirror',
      component: Codemirror,
    },
    {
      path: '/Card',
      name: 'Card',
      component: Card,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
  ],
});
