<template>
    <span>
        <v-row no-gutters>
            <v-col class="ma-auto pt-1 px-0">
                <svg-icon-device :index="index" size="64px"/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="6" class="mx-auto py-0 px-1">
                <svg-icon-level
                    size="24px"
                    :data="$store.state.const.radioLevels"
                    :level="subdevice.radioLevel"
                />
            </v-col>
            <v-col cols="6" class="mx-auto py-0 px-0">
                <svg-icon-level
                    size="24px"
                    :data="$store.state.const.powerLevels"
                    :level="subdevice.powerLevel"
                />
            </v-col>
        </v-row>
    </span>
</template>

<script>
import SvgIconLevel from '@/components/Svg/IconLevel.vue';
import SvgIconDevice from '@/components/Svg/IconDevice.vue';

export default {
    components: {
        SvgIconLevel,
        SvgIconDevice
    },

    props: {
        subdevice: [Object]
    },

    computed: {
        index() {
            return this.subdevice.type + '_' + this.subdevice.state;
        }
    }
};
</script>
