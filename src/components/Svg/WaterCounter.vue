<template>
    <!-- <svg viewBox="0 0 140 40" :width="width" :height="height"> -->
    <svg viewBox="0 0 140 40">
        <!-- round rect -->
        <rect
            x="1"
            y="1"
            rx="3"
            width="138"
            height="38"
            fill="none"
            stroke-width="2"
            :stroke="borderColor"
        />

        <!-- comma -->
        <path d="M100 33H97V37H98L100 33Z" :fill="borderColor" />

        <!-- digits -->
        <g
            v-for="(digit, i) in digits"
            :key="i"
            :transform="'translate(' + digit.px + ',' + digit.py + ')'"
            clip-path="url(#clip)"
        >
            <!-- background -->
            <rect
                width="15"
                height="32"
                rx="1.5"
                fill="url(#gradient_linear)"
            />
            <!-- glyphs -->
            <digit :value="digit.value" :color="digit.color" />
        </g>

        <!-- digits styling -->
        <defs>
            <linearGradient
                id="gradient_linear"
                x1="0"
                y1="0"
                x2="0"
                y2="32"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0.00" :stop-color="shadow" />
                <stop offset="0.25" :stop-color="background" />
                <stop offset="0.75" :stop-color="background" />
                <stop offset="1.00" :stop-color="shadow" />
            </linearGradient>
            <clipPath id="clip">
                <rect width="15" height="32" :fill="background" />
            </clipPath>
        </defs>
    </svg>
</template>

<style></style>

<script>
import Digit from '@/components/Svg/WaterCounterDigit.vue';
import { isNumber } from 'util';

export default {
    components: {
        Digit
    },

    props: {
        value: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            default: 140
        },
        height: {
            type: Number,
            default: 40
        },
        borderColor: {
            type: [String, Number],
            default: '#E2E2E2'
        },
        integerColor: {
            type: [String, Number],
            default: '#000000'
        },
        fractionalColor: {
            type: [String, Number],
            default: '#FF0000'
        },
        background: {
            type: [String, Number],
            default: '#FFFFFF'
        },
        shadow: {
            type: [String, Number],
            default: '#C4C4C4'
        }
    },

    mounted() {
        this.computeDigits(this.value);
    },

    methods: {
        computeDigits(value) {
            const d = isNumber(value) ? value : 0;

            for (var i = 0; i < this.digits.length; i++) {
                if (i > 0) {
                    const p = Math.pow(10, i + 1);
                    const f = (d % p) - (p - 1);
                    const x = Math.trunc(d / p) + (f > 0 ? f : 0);

                    this.digits[i].value = x < 0 ? x + 10 : x;
                } else {
                    this.digits[i].value = d / 10;
                }
            }
        },

        animateDigits(frame) {
            this.current += this.delta;
            this.computeDigits(this.current);

            const c = Math.trunc(this.current / 10);
            const v = Math.trunc(this.value / 10);

            if ((c > v && this.countdown) || (c < v && !this.countdown))
                setTimeout(() => this.animateDigits(frame), frame);
        }
    },

    watch: {
        value: function(n) {
            const d = isNumber(n) ? n : 0;

            if (d != this.current) {
                this.countdown = this.current > d;
                this.delta = (d - this.current) / (1000 / 25);

                this.animateDigits(25);
            }
            // window.console.log("New value: " + d);
        }
    },

    data() {
        return {
            current: 0,
            delta: 0,
            countdown: false,

            digits: [
                { px: 120, py: 4, color: this.fractionalColor, value: 0 },
                { px: 101, py: 4, color: this.fractionalColor, value: 0 },
                { px: 81, py: 4, color: this.integerColor, value: 0 },
                { px: 62, py: 4, color: this.integerColor, value: 0 },
                { px: 43, py: 4, color: this.integerColor, value: 0 },
                { px: 24, py: 4, color: this.integerColor, value: 0 },
                { px: 5, py: 4, color: this.integerColor, value: 0 }
            ]
        };
    }
};
</script>
