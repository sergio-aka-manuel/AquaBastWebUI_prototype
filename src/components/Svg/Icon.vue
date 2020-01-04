<template>
    <svg viewBox="0 0 24 24" :width="size" :height="size">
        <g filter="url(#filter0_d)" :fill="calculated_color">
            <path fill-rule="evenodd" clip-rule="evenodd" :d="path" />
        </g>
        <defs>
            <filter
                id="filter0_d"
                color-interpolation-filters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dx=".333" dy=".333" />
                <feGaussianBlur stdDeviation="0.333" />
                <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend in="SourceGraphic" result="shape" />
            </filter>
        </defs>
    </svg>
</template>

<script>
import svgData from './data/iconGlyphs.json';
import { isUndefined } from 'util';

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: [String, Number],
            default: 24
        },
        color: {
            type: String,
            default: 'primary'
        }
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
