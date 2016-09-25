import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import index from './App'
import signup from './Signup'
import user from './User'
/* eslint-disable no-new */

var App = Vue.extend({});

var router = new VueRouter();

router.map({
  '/index': {
    name: 'index',
    component: index
  },
  '/signup': {
    name: 'signup',
    component: signup
  },
  '/user/:userId': {
    name: 'user',
    component: user
  }
});
router.redirect({
  '*':"/index"
});

router.start(App, 'body');
