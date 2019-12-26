<template>
    <aqua-bast-icon :name="name" :color="color" :size="size"></aqua-bast-icon>
</template>

<script>
import AquaBastIcon from '@/components/SvgIcons/Icon.vue';
import { isUndefined } from 'util';

export default {
    components: {
        AquaBastIcon
    },

    props: {
        index: [String],
        size: [String, Number]
    },

    computed: {
        // index() {
        //     return this.device.type + '_' + this.device.state;
        // },

        name() {
            if (isUndefined(this.list[this.index])) {
                return 'INFO';
            } else return this.list[this.index].name;
        },

        color() {
            if (isUndefined(this.list[this.index])) {
                return 'error';
            } else return this.list[this.index].color;
        }
    },

    data() {
        return {
            list: this.$store.state.const.deviceStates
        };
    }
};
</script>
