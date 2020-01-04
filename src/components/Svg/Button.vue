<template>
    <svg viewBox="0 0 42 42" fill="none">
        <g filter="url(#filter1_d)">
            <!-- border -->
            <circle
                cx="21"
                cy="21"
                r="18"
                :fill="state == 'disabled' ? '#C4C4C4' : 'none'"
                :stroke="borderColor"
                stroke-width="2"
            />
            <!-- icon -->
            <g transform="translate(9,9)" :fill="iconColor">
                <path fill-rule="evenodd" clip-rule="evenodd" :d="path" />
            </g>
        </g>
        <defs>
            <filter
                id="filter1_d"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dx="0.75" dy="0.75" />
                <feGaussianBlur stdDeviation="1.0" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
</template>

<script>
import svgData from './data/iconGlyphs.json';

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: [String, Number],
            default: 40
        },
        state: {
            type: String,
            default: 'normal'
        }
    },

    computed: {
        path() {
            return svgData[this.name];
        },

        filter() {
            return svgData['filter-shadow-05'];
        },

        palette() {
            return this.$vuetify.theme.dark
                ? this.$vuetify.theme.themes.dark
                : this.$vuetify.theme.themes.light;
        },

        iconColor() {
            var color = this.palette['secondary'];
            if (this.state != 'disabled' ) color = this.palette['primary'];
            return color;
        },

        borderColor() {
            var color = this.palette['secondary'];
            if (this.state == 'error') color = this.palette['error'];
            if (this.state == 'normal') color = this.palette['primary'];
            return color;
        }
    }
};
</script>
