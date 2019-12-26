<template>
    <span>
        <app-navigation />

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

        <v-card class="ma-2" color="default">
            <v-icon>mdi-chevron-right</v-icon>
            <button @click="show = !show">
                Toggle render
            </button>
            <transition name="fade" mode="out-in">
                <!-- <p v-if="show" class="ma-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris facilisis enim libero, at lacinia diam fermentum id.
                    Pellentesque habitant morbi tristique senectus et
                    netus.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Mauris facilisis enim libero, at lacinia diam
                    fermentum id. Pellentesque habitant morbi tristique senectus
                    et netus.
                </p> -->
                <button v-if="show" key="save">
                    Save
                </button>
                <button v-else key="edit">
                    Edit
                </button>
            </transition>
        </v-card>
    </span>
</template>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
    transition: all 1s ease;
}
.fade-leave-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    /* transform: translateX(10px); */
    opacity: 0;
}

.my-bounce-enter-active {
    animation: my-bounce-in 0.5s;
}
.my-bounce-leave-active {
    animation: my-bounce-in 0.5s reverse;
}
@keyframes my-bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>

<script>
// @ is an alias to /src
// import AquaBastIcon from '@/components/AquaBastIcon.vue';
//import IconPowerLevel from '@/components/IconPowerLevel.vue';
//import IconRadioLevel from '@/components/IconRadioLevel.vue';

import AppNavigation from '@/components/AppNavigation';

export default {
    name: 'home',
    components: {
        // AquaBastIcon,
        // IconPowerLevel,
        // IconRadioLevel
        AppNavigation
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
        return {
            hidden: true,
            show: true
        };
    }
};
</script>
