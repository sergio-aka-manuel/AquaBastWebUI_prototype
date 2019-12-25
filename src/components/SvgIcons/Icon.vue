<template>
    <svg viewBox="0 0 24 24" :width="size" :height="size">
        <g filter="url(#filter)" :fill="calculated_color">
            <path fill-rule="evenodd" clip-rule="evenodd" :d="path" />
        </g>
        <defs v-html="filter"></defs>
    </svg>
</template>

<script>
import svgData from './svgdata.json';
import { isUndefined } from 'util';

export default {
    props: {
        name: String,
        size: String,
        color: String
    },

    computed: {
        path() {
            return svgData[this.name];
        },

        filter() {
            return svgData['filter-shadow-05'];
        },

        calculated_color() {
            var c = this.$vuetify.theme.dark
                ? this.$vuetify.theme.themes.dark[this.color]
                : this.$vuetify.theme.themes.light[this.color];

            return isUndefined(c) ? this.color : c;
        }
    }
};
</script>

<style scoped></style>
