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
        level: [Number, String],
        size: [Number, String],
        data: [Object]
    },

    computed: {
        name() {
            if (isUndefined(this.data) || isUndefined(this.data[this.level])) {
                return 'INFO';
            } else
                return isUndefined(this.level)
                    ? this.data[undefined].name
                    : this.data[this.level].name;
        },

        color() {
            if (isUndefined(this.data) || isUndefined(this.data[this.level])) {
                return 'error';
            } else
                return isUndefined(this.level)
                    ? this.data[undefined].color
                    : this.data[this.level].color;
        }
    }
};
</script>
