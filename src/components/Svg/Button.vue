<template>
    <svg viewBox="0 0 40 40" fill="none">
        <g filter="url(#filter1_d)">
            <!-- border -->
            <circle
                cx="20"
                cy="20"
                r="15"
                stroke-width="2"
                fill-opacity="0"
                :stroke="borderColor"
                :fill="state == 'disabled' ? '#C4C4C4' : 'white'"
                :class="animated"
                @click.stop="onClick()"
            />

            <!-- icon -->
            <!-- @click.stop="$emit('button-click')" -->
            <g
                transform="translate(8,8)"
                :fill="iconColor"
                @click.stop="onClick()"
            >
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

<style scoped>
@keyframes radius {
    /* from {
        r: 15;
    }
    to {
        r: 18;
    } */

    0% {
        r: 15;
    }

    15% {
        r: 18;
        stroke: orange;
    }

    80% {
        r: 14;
    }

    100% {
        r: 15;
    }
}

.animated {
    animation: radius 0.5s;
}
</style>

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

    methods: {
        onClick() {
            if (this.state != 'disabled') {
                this.$emit('button-click');
                this.animated = 'animated';

                setTimeout(() => {
                    this.animated = '';
                }, 500);
            }
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
            if (this.state != 'disabled') color = this.palette['primary'];
            return color;
        },

        borderColor() {
            var color = this.palette['secondary'];
            if (this.state == 'error') color = this.palette['error'];
            if (this.state == 'normal') color = this.palette['primary'];
            return color;
        }
    },

    data() {
        return {
            animated: ''
        };
    }
};
</script>
