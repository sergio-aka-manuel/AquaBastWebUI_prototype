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
        device: [Object],
        data: [Object],
        size: [String, Number]
    },

    computed: {
        index() {
            return this.device.type + '_' + this.device.state;
        },

        name() {
            if (isUndefined(this.data) || isUndefined(this.data[this.index])) {
                return 'INFO';
            } else return this.data[this.index].name;
        },

        color() {
            if (isUndefined(this.data) || isUndefined(this.data[this.index])) {
                return 'error';
            } else return this.data[this.index].color;
        }
    }
};
</script>
