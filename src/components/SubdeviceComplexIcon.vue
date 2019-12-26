<template>
    <span>
        <v-row no-gutters>
            <v-col class="ma-auto pt-1 px-0">
                <aqua-bast-icon-device :index="index" />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="6" class="mx-auto py-0 px-1">
                <aqua-bast-icon-level
                    size="24px"
                    :data="$store.state.const.radioLevels"
                    :level="subdevice.radioLevel"
                ></aqua-bast-icon-level>
            </v-col>
            <v-col cols="6" class="mx-auto py-0 px-0">
                <aqua-bast-icon-level
                    size="24px"
                    :data="$store.state.const.powerLevels"
                    :level="subdevice.powerLevel"
                ></aqua-bast-icon-level>
            </v-col>
        </v-row>
    </span>
</template>

<script>
import AquaBastIconLevel from '@/components/SvgIcons/Level.vue';
import AquaBastIconDevice from '@/components/SvgIcons/Device.vue';

export default {
    components: {
        AquaBastIconLevel,
        AquaBastIconDevice
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
