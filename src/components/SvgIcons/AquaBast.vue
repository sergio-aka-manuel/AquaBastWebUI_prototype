<template>
    <svg viewBox="0 0 24 24" :width="size" :height="size">
        <g filter="url(#filter)" :fill="color">
            <path fill-rule="evenodd" clip-rule="evenodd" :d="path" />
        </g>
        <defs v-html="filter"></defs>
    </svg>
</template>

<script>
import svgData from './svgdata.json';

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
        }
    }
};
</script>

<style scoped></style>
