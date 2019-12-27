<template>
    <span>
        <navigation />

        <v-fab-transition>
            <v-btn
                v-show="!hidden"
                class="mb-12"
                color="pink"
                dark
                absolute
                bottom
                right
                fab
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>

        <v-card
            class="ma-2"
            color="default"
            v-for="(device, i) in devices"
            :key="i"
            @click.stop="toDashboard(device.uid)"
        >
            <v-card-title class="text-truncate font-weight-regular">{{
                device.name
            }}</v-card-title>
            <v-card-subtitle>{{ device.description }}</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions>
                <!-- <icon-radio-level v-bind:level="device.state.radioLevel"></icon-radio-level>
                <icon-power-level v-bind:level="device.state.powerLevel"></icon-power-level> -->
                <v-spacer></v-spacer>
                <v-chip color="error" small>
                    <v-icon left color="default">mdi-alert-circle</v-icon>
                    <!-- <span style="color: red;">Протечка!</span> -->
                    Протечка
                </v-chip>
                <v-spacer></v-spacer>
                <v-icon>mdi-chevron-right</v-icon>
            </v-card-actions>
        </v-card>
    </span>
</template>

<script>
// @ is an alias to /src
// import AquaBastIcon from '@/components/AquaBastIcon.vue';
//import IconPowerLevel from '@/components/IconPowerLevel.vue';
//import IconRadioLevel from '@/components/IconRadioLevel.vue';

import Navigation from '@/components/Navigation';

export default {
    name: 'home',
    components: {
        // AquaBastIcon,
        // IconPowerLevel,
        // IconRadioLevel
        Navigation
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
        },

        toSensors: function(uid) {
            this.$router.push('/devices/' + uid);
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

        devices() {
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
        return {};
    }
};
</script>
