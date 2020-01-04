<template>
    <svg-icon :name="name" :color="color" :size="size" />
</template>

<script>
import SvgIcon from '@/components/Svg/Icon.vue';
import { isUndefined } from 'util';

export default {
    components: {
        SvgIcon
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
