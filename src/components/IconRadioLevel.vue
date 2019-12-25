<template>
    <aqua-bast-icon
        :name="value[level].name"
        :color="value[level].color"
        :size="size"
    ></aqua-bast-icon>
</template>

<style scoped></style>

<script>
import AquaBastIcon from '@/components/SvgIcons/Icon.vue';

export default {
    components: {
        AquaBastIcon
    },

    props: {
        level: [Number, String],
        size: [Number, String]
    },

    computed: {},

    data() {
        return {
            value: {
                undefined: { name: 'radio-offline', color: 'error' },
                0: { name: 'radio-0', color: 'error' },
                1: { name: 'radio-1', color: 'secondary' },
                2: { name: 'radio-2', color: 'secondary' },
                3: { name: 'radio-3', color: 'secondary' }
            },
            expanded: ''
        };
    }
};
</script>
