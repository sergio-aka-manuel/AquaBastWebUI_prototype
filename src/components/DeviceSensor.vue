<template>
    <v-card class="mb-2" color="default" :ripple="false">
        <v-row no-gutters>
            <v-col cols="2">
                <v-row no-gutters>
                    <v-col class="ma-auto pt-1 px-0">
                        <aqua-bast-icon-device
                            :data="deviceIcons"
                            :device="device"
                        ></aqua-bast-icon-device>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="6" class="ma-auto py-0 px-2">
                        <aqua-bast-icon-level
                            size="24px"
                            :data="radioIcons"
                            :level="device.radioLevel"
                        ></aqua-bast-icon-level>
                    </v-col>
                    <v-col cols="6" class="ma-auto py-0 px-0">
                        <aqua-bast-icon-level
                            size="24px"
                            :data="powerIcons"
                            :level="device.powerLevel"
                        ></aqua-bast-icon-level>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row no-gutters>
                    <v-card-title class="px-1 py-1">
                        <span
                            class="d-inline-block text-truncate font-weight-regular"
                            >{{
                                device.name
                                    ? device.name
                                    : getComponentName(device)
                            }}
                        </span>
                    </v-card-title>
                    <v-spacer></v-spacer>
                    <v-fade-transition>
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-fade-transition>
                </v-row>
                <v-row no-gutters>
                    <v-card-subtitle class="px-1 py-0">{{
                        device.description
                            ? device.description
                            : getComponentDescription(device)
                    }}</v-card-subtitle>
                </v-row>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import AquaBastIconLevel from '@/components/SvgIcons/IconLevel.vue';
import AquaBastIconDevice from '@/components/SvgIcons/IconDevice.vue';

export default {
    components: {
        AquaBastIconLevel,
        AquaBastIconDevice
    },

    props: {
        device: [Object]
    },

    methods: {
        getComponentName(component) {
            return (
                this.$store.state.const.deviceDefaults[component.type].name +
                (1 + component.number)
            );
        },

        getComponentDescription(component) {
            return (
                this.$store.state.const.deviceDefaults[component.type]
                    .description + component.host
            );
        }
    },

    computed: {
        deviceIcons() {
            return this.$store.state.const.deviceIcons;
        },

        radioIcons() {
            //return this.$store.state.const.wifiLevelIcons;
            return this.$store.state.const.radioLevelIcons;
        },

        powerIcons() {
            return this.$store.state.const.powerLevelIcons;
        }

        // name() {
        //     if (isUndefined(this.data) || isUndefined(this.data[this.level])) {
        //         return 'INFO';
        //     } else
        //         return isUndefined(this.level)
        //             ? this.data[undefined].name
        //             : this.data[this.level].name;
        // },
        // color() {
        //     if (isUndefined(this.data) || isUndefined(this.data[this.level])) {
        //         return 'error';
        //     } else
        //         return isUndefined(this.level)
        //             ? this.data[undefined].color
        //             : this.data[this.level].color;
        // }
    }
};
</script>
