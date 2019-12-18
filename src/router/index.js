import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About";
import Login from '../views/Login.vue'

import Devices from '../views/Devices.vue'
import Graphs from '../views/Graphs.vue'
import Logs from '../views/Logs.vue'

import LoginConfirmation from '../views/LoginConfirmation.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  {
    name: 'confirm',
    path: '/confirm',
    component: LoginConfirmation,
  },
  {
    name: 'dashboard',
    path: '/dashboard/:uid',
    component: Dashboard,
  },
  {
    name: 'logs',
    path: '/logs/:uid',
    component: Logs,
  },
  {
    name: 'graphs',
    path: '/graphs/:uid',
    component: Graphs,
  },
  {
    name: 'devices',
    path: '/devices/:uid',
    component: Devices,
  }

  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
