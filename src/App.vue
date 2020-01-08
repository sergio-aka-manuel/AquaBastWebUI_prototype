<template>
    <v-app>
        <v-content transition="slide-x-transition">
            <router-view></router-view>
        </v-content>
        <!-- <router-view></router-view> -->
    </v-app>
</template>

<script>
//
// import store from './store';

const axios = require('axios').default;

export default {
    name: 'App',

    beforeCreate() {
        //TODO: check code revision && reload, if necessary

        let _last = 0;
        const _now = Math.floor(Date.now() / 1000);

        if (localStorage.lastCodeUpdate) {
            _last = localStorage.getItem('lastCodeUpdate');
        }

        if (_now - _last > 60) {
            window.console.log('beforeCreate: reload.');

            window.location.reload();
            localStorage.setItem('lastCodeUpdate', _now);
        }
    },

    mounted() {
        window.console.log('mounted: ');
        window.console.log('hostname: ' + window.location.hostname);
        window.console.log('pathname: ' + window.location.pathname);
        window.console.log('origin: ' + window.location.origin);

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

    computed: {},

    data() {
        return {
            /* MQTT Client */
            mqtt: {},

            info: null
        };
    }
};
</script>

<style></style>
