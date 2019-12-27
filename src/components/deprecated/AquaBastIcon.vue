<template>
    <!-- <v-icon>{{ icon }} mdi-48px</v-icon> -->
    <svg viewBox="-1 -1 27 27" xmlns="http://www.w3.org/2000/svg">
        <path
            :fill="color"
            stroke="lightgray"
            stroke-width="0.3"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.14 3.56l-2.89 6.1H11l-2.86-6.1zM7.94 0h.4l6.13 13.14V0h3.31a7.8 7.8 0 013.07.48c.72.31 1.28.8 1.7 1.45a4.02 4.02 0 01-1.53 5.71c.87.3 1.54.65 2.01 1.05a4.21 4.21 0 011.5 3.3c0 1.34-.5 2.48-1.48 3.41-.98.94-2.3 1.4-3.97 1.4H14.38l-2.64-5.52H4.5L1.87 16.8H0L7.94 0zm12.95 14.8a3.11 3.11 0 001.38-1.13 2.9 2.9 0 00.52-1.65c0-.75-.25-1.4-.74-1.96a3.72 3.72 0 00-2-1.14 14.4 14.4 0 00-2.99-.2h-.95v6.44h2.08c1.23 0 2.13-.12 2.7-.36zM18.06 1.64H16.1v5.39h.96c1.17 0 2.03-.11 2.57-.33a2.77 2.77 0 001.78-2.59 2.2 2.2 0 00-.8-1.8c-.54-.45-1.39-.67-2.56-.67zM25 22.44c-3.59-.87-6.6-.04-9.57.76-3.9 1.07-7.73 2.1-12.65-.75 4.22.6 7.03-.25 9.63-1.03 3.56-1.08 6.73-2.04 12.59 1.03zm-14.28-2.49c2.28-.61 4.66-1.26 7.4-.57-4.26-2.24-6.57-1.54-9.17-.76-1.9.58-3.94 1.2-7.01.75 3.12 2.1 5.87 1.37 8.78.58z"
        />
    </svg>
</template>

<style scoped>
</style>

<script>
export default {
    props: {
        error: [Boolean, String]
    },

    computed: {
        icon() {
            return 'mdi-emoticon-cry-outline';
        },

        color() {
            // const AquaBastRedColor = 'rgb(219, 43, 57)';
            // const AquaBastBlueColor = 'rgb(1, 72, 138)';

            return this.error
                ? this.$store.state.const.AquaBastRedColor
                : this.$store.state.const.AquaBastBlueColor;
        }
    }
};
</script>
