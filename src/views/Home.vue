<template>
    <!-- <span> -->
    <!-- <v-layout justify-center>
            <h2>Home page</h2>
        </v-layout>
        <v-layout justify-center>
            <img alt="Under construction..." src="../assets/animated-gifs-under-construction.gif" />
        </v-layout>

        <v-layout justify-center>
            <p>lastCodeUpdate: {{_lastCodeUpdate}}</p>
        </v-layout>
        <v-layout justify-center>
            <p>dark mode: {{_darkMode}}</p>
    </v-layout>-->

    <!-- <v-divider></v-divider> -->

    <!-- <v-layout justify-center>
            <v-card>
                <v-row>
                    <v-col cols="3">
                        <v-row>
                            <v-layout justify-center>
                                <v-icon>mdi-arrow-left</v-icon>
                            </v-layout>
                        </v-row>
                        <v-row>
                            <v-layout justify-space-around justify-space-between>
                                <v-col cols="1">
                                    <v-layout justify-center>
                                        <v-icon>mdi-signal-variant</v-icon>
                                    </v-layout>
                                </v-col>
                                <v-col cols="1">
                                    <v-layout justify-center>
                                        <v-icon>mdi-battery-70</v-icon>
                                    </v-layout>
                                </v-col>
                            </v-layout>
                        </v-row>
                    </v-col>

                    <v-col cols="8">
                        <v-row>
                            <v-layout>Речная 113, кв. 91 (кухня)</v-layout>
                        </v-row>
                    </v-col>

                    <v-col cols="1">
                        <v-container fill-height>
                            <v-layout align-center justify-center>
                                <v-icon>mdi-menu-right</v-icon>
                            </v-layout>
                        </v-container>
                    </v-col>
                </v-row>
            </v-card>
    </v-layout>-->
    <!-- </span> -->
    <span>
        <template v-for="(device, i) in devices">
            <v-card @click.stop="toDashboard(device.uid)" :key="i">
                <v-card-text>
                    <v-row align="center">
                        <v-col>
                            <v-row justify="center" align="start">
                                <v-icon color="error">{{ device.icon }} mdi-48px</v-icon>
                            </v-row>
                            <v-row justify="center" align="stretch">
                                <v-icon>{{ getDeviceRadioLevelIcon(device.uid) }} mdi-18px</v-icon>
                                <v-icon>{{ getDevicePowerLevelIcon(device.uid) }} mdi-18px</v-icon>
                            </v-row>
                        </v-col>
                        <v-col cols="10" style="padding: 0px;">
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{ device.title }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ device.subtitle }}</v-list-item-subtitle>
                                    <!-- <v-list-item-subtitle>Состояние: Норма, протечек нет</v-list-item-subtitle> -->
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col style="padding: 0px;">
                            <v-row align="center" justify="center">
                                <v-icon>mdi-menu-right</v-icon>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </template>
    </span>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: 'home',
    components: {},

    methods: {
        getDeviceRadioLevelIcon: function(uid) {
            return uid ? 'mdi-signal-variant' : 'mdi-signal-off';
        },

        getDevicePowerLevelIcon: function(uid) {
            return uid ? 'mdi-battery-50' : 'mdi-battery-alert';
        },

        toDashboard: function(uid) {
            window.console.log(uid);
            this.$router.push('dashboard');
        }
    },

    computed: {
        _lastCodeUpdate() {
            return localStorage.getItem('lastCodeUpdate');
        },

        _darkMode() {
            return localStorage.getItem('darkMode');
        }
    },

    data() {
        return {
            devices: [
                {
                    icon: 'mdi-close-network',
                    title: 'Речная 113, кв.91',
                    subtitle:
                        'Описание объекта установки системы и еще много-много буков',
                    uid: '111111111'
                },
                {
                    title: 'Другой объект',
                    icon: 'mdi-close-network',
                    subtitle: '/',
                    uid: '222222'
                },
                {
                    title: 'Другой объект',
                    icon: 'mdi-close-network',
                    subtitle: '/',
                    uid: '333'
                },
                {
                    title: 'Другой объект',
                    icon: 'mdi-close-network',
                    subtitle: '/',
                    uid: '444'
                },
                {
                    title: 'Другой объект',
                    icon: 'mdi-close-network',
                    subtitle: '/',
                    uid: '555'
                }
            ]
        };
    }
};
</script>
