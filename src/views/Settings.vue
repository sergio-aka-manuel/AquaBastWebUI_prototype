<template>
    <span>
        <navigation :title="'UID: ' + $route.params.uid" />

        <v-layout>
            <h2 class="ma-auto pa-4">Settings page</h2>
        </v-layout>

        <v-layout justify-center>
            <img
                alt="Under construction..."
                src="../assets/animated-gifs-under-construction.gif"
            />
        </v-layout>
    </span>
</template>

<style scoped></style>

<script>
import Navigation from '@/components/NavReturn.vue';

export default {
    components: {
        Navigation
    },

    computed: {
        counter() {
            return this.$store.state.count;
        }
    }
};
</script>
