<template>
    <v-app>
        <navigation title="AquaBast" :menu="menuItems" />

        <v-content transition="slide-x-transition">
            <router-view></router-view>
        </v-content>
        <!-- <router-view></router-view> -->
    </v-app>
</template>

<script>
import { isUndefined } from 'util';
//
// import store from './store';

const axios = require('axios').default;
import Navigation from '@/components/Navigation/ApplicationBar.vue';

export default {
    name: 'App',
    components: {
        Navigation
    },

    beforeCreate() {
        this.$vuetify.theme.dark = localStorage.getItem('darkMode') == 'true';
    },

    created() {
        this.checkWebUiVersion();
        this.checkStartAs();
        this.mqttConnect();
    },

    mounted() {
        this.$store.commit('increment');
        window.console.log(this.$store.state.count);
    },

    methods: {
        checkStartAs() {
            if (window.location.hostname === 'localhost')
                this.$store.commit('setStartAs', 'dev');
            //TODO: local mode
            // else if (window.location.hostname === '???')
            //     this.$store.commit('setStartAs', 'local');
            else if (window.location.pathname === '/?webapp')
                this.$store.commit('setStartAs', 'app');
            else {
                this.$store.commit('setStartAs', 'page');
            }
        },

        checkWebUiVersion() {
            const version = this.$store.state.const.version;
            const webui = this.$store.state.const.webui;
            const url = webui.host + webui.versionUrl;

            axios
                .get(url)
                .then(responce => {
                    const remoteVersion =
                        responce.data.major && responce.data.minor
                            ? parseInt(responce.data.major) * 100 +
                              parseInt(responce.data.minor)
                            : 0;

                    const localVersion =
                        version.major && version.minor
                            ? parseInt(version.major) * 100 +
                              parseInt(version.minor)
                            : 0;

                    if (remoteVersion > localVersion) {
                        window.console.log('versionCheck: reload sources!');
                        window.location.reload();
                    } else {
                        window.console.log('versionCheck: ok.');
                    }
                })
                .catch(() => {
                    axios({
                        method: 'post',
                        url: url,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: 'value=' + JSON.stringify(version)
                    });
                });
        },

        // MQTT
        mqttConnect() {
            if (
                this.$store.state.startAs != 'local' &&
                !isUndefined(window.Paho.MQTT.Client)
            ) {
                const user = localStorage.getItem('mqtt_username') || 'admin';
                const pass =
                    localStorage.getItem('mqtt_password') || 'Gj08y941';
                this.mqttClientId =
                    localStorage.getItem('mqtt_client_id') || '112233445';

                window.console.log(user, pass, this.mqtt_client_id);

                // setup mqtt connection
                var connectOptions = {
                    //hosts: [],
                    //ports:[],
                    timeout: 30,
                    useSSL: false,
                    userName: user,
                    password: pass,
                    cleanSession: false,
                    keepAliveInterval: 60,

                    onSuccess: this.mqttOnConnect,
                    onFailure: this.mqttOnConnectFailure
                };

                this.mqtt = new window.Paho.MQTT.Client(
                    this.$store.state.credentials.mqtt.host,
                    this.$store.state.credentials.mqtt.port,
                    this.$store.state.credentials.mqtt.path,
                    this.mqttClientId
                );
                this.mqtt.connect(connectOptions);
                this.mqtt.onMessageArrived = this.onMessageArrived;
                this.mqtt.onConnectionLost = this.mqttOnConnectionLost;
            }
        },

        mqttSubscribe(filter) {
            this.mqtt.subscribe(filter, {
                onSuccess: () =>
                    window.console.log("subscribe to '" + filter + "': ok"),
                onFailure: () =>
                    window.console.log("subscribe to '" + filter + "': FAIL!")
            });
        },

        mqttUnsubscribe(filter) {
            this.mqtt.subscribe(filter, {
                onSuccess: () =>
                    window.console.log("unsubscribe from '" + filter + "': ok"),
                onFailure: () =>
                    window.console.log(
                        "unsubscribe from '" + filter + "': FAIL!"
                    )
            });
        },

        mqttSendMessage(topic, data, qos, retain) {
            //this.mqtt.send(topic, data, qos, retain);
            var msg = new window.Paho.MQTT.Message(data);
            msg.destinationName = topic;
            msg.retained = retain || false;
            msg.qos = qos || 0;

            this.mqtt.send(msg);
        },

        // MQTT Handlers
        mqttOnConnect: function() {
            this.$store.commit('setCloudStatus', 'mqtt');

            window.console.log(
                'mqtt connect success!, cid: ',
                this.mqttClientId
            );

            this.mqttSubscribe('test/#');

            this.mqttSendMessage(
                'status/' + this.mqttClientId,
                JSON.stringify({
                    startAs: this.$store.state.startAs,
                    version: this.$store.state.const.version,
                    date: Math.trunc(new Date().getTime() / 1000)
                }),
                1,
                true
            );
        },

        mqttOnConnectFailure: function() {
            window.console.log('mqtt connect failed..');
            window.console.log('cid: ', this.mqttClientId);
            this.mqttReconnect(60);
        },

        mqttOnConnectionLost() {
            window.console.log('mqtt connection lost..');
            window.console.log('cid: ', this.mqttClientId);
            this.mqttReconnect(20);
        },

        mqttReconnect(seconds) {
            this.$store.commit('setCloudStatus', 'init');
            clearTimeout(this.mqttReconnectTimer);
            this.mqttReconnectTimer = setTimeout(
                this.mqttConnect,
                (seconds || 30) * 1000
            );
        },

        onMessageArrived: function(msg) {
            window.console.log(
                "topic:'" +
                    msg.destinationName +
                    "', payload: '" +
                    msg.payloadString +
                    "'"
            );
        }
    },

    computed: {},

    data() {
        return {
            /* MQTT Client */
            mqtt: {},
            mqttClientId: '',
            mqttReconnectTimer: null,

            info: null,
            menuItems: [
                // { heading: 'menu' },
                {
                    title: 'Журнал событий',
                    path: '/journal/all',
                    icon: 'journal'
                },
                {
                    title: 'Настройки',
                    path: '/settings/application',
                    icon: 'settings'
                },
                { divider: true },
                {
                    title: 'О программе',
                    path: '/about/application',
                    icon: 'INFO'
                }
            ]
        };
    }
};
</script>

<style></style>
