<template>
    <span>
        <template v-for="(device, i) in _devicesList">
            <v-card @click.stop="toDashboard(device.uid)" :key="i">
                <v-card-text>
                    <v-row align="center">
                        <v-col>
                            <v-row justify="center" align="start">
                                <!-- <v-icon color="normal">{{ getDeviceIcon(device.type) }} mdi-48px</v-icon> -->
                                <div style="width: 48px">
                                    <aqua-bast-icon v-bind:error="device.state.error"></aqua-bast-icon>
                                </div>
                            </v-row>
                            <v-row justify="center" align="stretch">
                                <icon-radio-level
                                    style="padding-top: 1px"
                                    v-bind:level="device.state.radioLevel"
                                ></icon-radio-level>
                                <icon-power-level
                                    style="padding-bottom: 2px"
                                    v-bind:level="device.state.powerLevel"
                                ></icon-power-level>
                            </v-row>
                        </v-col>
                        <v-col cols="10" style="padding: 0px;">
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title>{{ device.name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ device.description }}</v-list-item-subtitle>
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
import AquaBastIcon from '@/components/AquaBastIcon.vue';
import IconPowerLevel from '@/components/IconPowerLevel.vue';
import IconRadioLevel from '@/components/IconRadioLevel.vue';

export default {
    name: 'home',
    components: {
        AquaBastIcon,
        IconPowerLevel,
        IconRadioLevel
    },

    methods: {
        getDeviceIcon(type) {
            var _icon;

            switch (type) {
                case '0401':
                    _icon = 'mdi-all-inclusive';
                    break;

                default:
                    _icon = 'mdi-signal-off';
            }

            return _icon;
        },

        getDeviceRadioLevelIcon: function(uid) {
            return uid ? 'mdi-signal-variant' : 'mdi-signal-off';
        },

        getDevicePowerLevelIcon: function(uid) {
            return uid ? 'mdi-battery-50' : 'mdi-battery-alert';
        },

        toDashboard: function(uid) {
            //window.console.log(uid);
            this.$router.push('dashboard/' + uid);
        }
    },

    computed: {
        _deviceLogoColor() {
            return 'red';
        },

        _lastCodeUpdate() {
            return localStorage.getItem('lastCodeUpdate');
        },

        _darkMode() {
            return localStorage.getItem('darkMode');
        },

        _devicesList() {
            const targetType = '0401';

            return this.$store.state.devices
                .filter(function(d) {
                    // filter only target type devices
                    return d.type == targetType;
                })
                .sort(function(a, b) {
                    // sort devices by status|name
                    return a.name > b.name ? 1 : -1;
                });
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
