<template>
    <v-card
        :href="'dashboard/' + device.uid"
        :ripple="false"
        color="defult"
        elevation="4"
        class="ma-2"
    >
        <v-card-title class="text-truncate font-weight-regular">{{
            device.name
        }}</v-card-title>

        <v-card-subtitle>{{ device.description }}</v-card-subtitle>

        <v-divider />

        <v-card-actions class="pa-2">
            <svg-icon-level
                size="24px"
                :data="$store.state.const.wifiLevels"
                :level="device.radioLevel"
            />
            <svg-icon-level
                size="24px"
                :data="$store.state.const.powerLevels"
                :level="device.powerLevel"
            />
            <div style="width: 10px;" />
            <svg-icon-device
                size="24px"
                :data="$store.state.const.deviceStates"
                :device="device"
            />

            <span class="pl-2"> {{ stateText }}</span>

            <v-spacer />
            <v-icon class="pl-1">mdi-chevron-right</v-icon>
        </v-card-actions>
    </v-card>
</template>

<script>
import SvgIconLevel from '@/components/SvgIcons/Level.vue';
import SvgIconDevice from '@/components/SvgIcons/Device.vue';
import { isUndefined } from 'util';

export default {
    components: {
        SvgIconLevel,
        SvgIconDevice
    },

    props: {
        device: [Object]
    },

    computed: {
        state() {
            return this.device.type + '_' + this.device.state;
        },

        stateText() {
            return !isUndefined(
                this.$store.state.const.deviceStates[this.state]
            )
                ? this.$store.state.const.deviceStates[this.state].text
                : 'undefined...';
        }
    }
};
</script>
