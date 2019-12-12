<template>
    <v-app>
        <app-navigation></app-navigation>

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

    beforeCreate() {},

    created: function() {
        // window.console.log('on created: hello!');

        this.$store.state.dark = true;

        this.$vuetify.theme.dark = this.$store.state.dark;
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

        require('./mqttws31.min.js').default;
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
