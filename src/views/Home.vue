<template>
    <v-container>
        <v-card
            class="mb-2"
            color="default"
            v-for="(device, i) in _devicesList"
            :key="i"
            @click.stop="toDashboard(device.uid)"
        >
            <v-card-title class="text-truncate font-weight-regular">{{ device.name }}</v-card-title>
            <v-card-subtitle>{{ device.description }}</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-actions>
                <icon-radio-level v-bind:level="device.state.radioLevel"></icon-radio-level>
                <icon-power-level v-bind:level="device.state.powerLevel"></icon-power-level>
                <v-spacer></v-spacer>
                <v-chip color="error" smal outlined>
                    <v-icon left color="default">mdi-alert-circle</v-icon>Протечка!
                </v-chip>
                <v-spacer></v-spacer>
                <v-icon>mdi-chevron-right</v-icon>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
// @ is an alias to /src
// import AquaBastIcon from '@/components/AquaBastIcon.vue';
import IconPowerLevel from '@/components/IconPowerLevel.vue';
import IconRadioLevel from '@/components/IconRadioLevel.vue';

export default {
    name: 'home',
    components: {
        // AquaBastIcon,
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
