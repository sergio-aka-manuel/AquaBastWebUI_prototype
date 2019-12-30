import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '../views/About';

// import Login from '../views/Login.vue'
// import LoginConfirmation from '../views/LoginConfirm.vue'

import Charts from '../views/Charts.vue';
import Journal from '../views/Journal.vue';
import Settings from '../views/Settings.vue';

import Dashboard from '../views/Dashboard.vue';
import DeviceList from '../views/DeviceList.vue';
import SubdeviceList from '../views/SubdeviceList.vue';

Vue.use(VueRouter);

const routes = [
    {
        name: 'about',
        path: '/about/:uid',
        component: About
    },
    {
        name: 'deviceList',
        path: '/',
        component: DeviceList
    },
    {
        name: 'subdeviceList',
        path: '/subdev/:uid',
        component: SubdeviceList
    },
    {
        name: 'dashboard',
        path: '/dashboard/:uid',
        component: Dashboard
    },
    {
        name: 'charts',
        path: '/charts/:uid',
        component: Charts
    },
    {
        name: 'journal',
        path: '/journal/:uid',
        component: Journal
    },
    {
        name: 'settings',
        path: '/settings/:uid',
        component: Settings
    }

    // {
    //   name: 'login',
    //   path: '/login',
    //   component: Login,
    // },
    // {
    //   name: 'confirm',
    //   path: '/confirm',
    //   component: LoginConfirmation,
    // },

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
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
