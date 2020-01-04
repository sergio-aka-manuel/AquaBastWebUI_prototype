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
