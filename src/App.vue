<template>
    <v-app>
        <app-navigation v-if="appNavigationEnabled"></app-navigation>

        <v-app-bar app v-else>
            <!-- <v-icon ></v-icon> -->
            <v-btn @click.stop="$router.go(-1)" icon>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <!-- <v-toolbar-title>Речная 113, кв.91</v-toolbar-title> -->

            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title>Речная 113, кв.91</v-list-item-title>
                    <!-- <v-list-item-subtitle>квартира, две строки текста помещаются</v-list-item-subtitle> -->
                </v-list-item-content>
            </v-list-item>

            <v-spacer></v-spacer>

            <!-- <v-icon>mdi-cloud-sync</v-icon> -->

            <v-btn icon>
                <v-icon>mdi-help-circle</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content transition="slide-x-transition">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
// import store from './store';

const axios = require('axios').default;

export default {
    name: 'App',

    beforeCreate() {
        let _last = 0;
        let _now = Math.floor(Date.now() / 1000);

        if (localStorage.lastCodeUpdate) {
            _last = localStorage.getItem('lastCodeUpdate');
        }

        if (_now - _last > 60) {
            localStorage.setItem('lastCodeUpdate', _now);
            window.location.reload();
        }
    },

    mounted() {
        window.console.log('on beforeCreate: ');
        window.console.log('hostname: ' + window.location.hostname);
        window.console.log('pathname: ' + window.location.pathname);
        window.console.log('origin: ' + window.location.origin);

        // this.$http
        //     .get('http://test-cloud.bast.ru:10495/cloud/user/devices')
        //     .then(
        //         responce => {
        //             window.console.log('success: ' + responce);
        //         },
        //         responce => {
        //             window.console.log('failure: ' + responce);
        //         }
        //     );
        axios
            // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .get('http://sa100.hopto.org/api/kv/aaa')
            .then(responce => this.onResponce(responce))
            .catch(error => window.console.log(error))
            .finally(() => (this.info = null));

        var client_id = 'clientjs-' + Math.random().toString(16);
        var options = {
            timeout: 30,
            useSSL: false,
            userName: 'admin',
            password: 'Gj08y941',
            keepAliveInterval: 60,
            onSuccess: this.onConnect
            // onSuccess: function() {
            //     window.console.log('connected! ');
            //     this.mqtt.subscribe('test/#');
            // }
            // onFailure: window.console.log('connect failed..')
        };

        window.console.log('MQTT Client Id: ' + client_id);

        // require('./mqttws31.min.js').default;
        this.mqtt = new window.Paho.MQTT.Client(
            'test-cloud.bast.ru',
            3883,
            '/mqtt',
            client_id
        );
        this.mqtt.connect(options);
        this.mqtt.onMessageArrived = this.mqttOnMessageArrived;
        //this.mqtt.onConnectionLost = mqttOnConnectionLost;

        this.$store.commit('increment');
        window.console.log(this.$store.state.count);
    },

    methods: {
        onConnect: function() {
            window.console.log('subscribe to test/#');
            this.mqtt.subscribe('test/#');
        },
        mqttOnMessageArrived: function(msg) {
            window.console.log(
                "topic:'" +
                    msg.destinationName +
                    "', payload: '" +
                    msg.payloadString +
                    "'"
            );
        },

        onResponce(responce) {
            this.info = responce;
            window.console.log(responce);
        }
    },

    computed: {
        appNavigationEnabled() {
            let _result =
                this.$route.path != '/dashboard' &&
                this.$route.path != '/devices' &&
                this.$route.path != '/graphs' &&
                this.$route.path != '/logs';
            return _result;
        },

        bottomHemicircleColor() {
            return this.AquaBastBlueColor;
        },
        strokeColorThemed() {
            let color = this.$vuetify.theme.dark ? 'lightgray' : 'gray';
            return color;
        }
    },

    components: {
        AppNavigation
    },

    // data: () => ({ mqtt: {} })
    data() {
        return {
            info: null,
            mqtt: {}
        };
    }
};
</script>

<style></style>
