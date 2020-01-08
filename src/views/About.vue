<template>
    <span>
        <navigation :title="'UID: ' + $route.params.uid" />

        <v-layout>
            <h2 v-if="$route.path == '/about/application'" class="ma-auto pa-4">
                About page
            </h2>

            <h2 v-else class="ma-auto pa-4">
                Help page
            </h2>
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
import Navigation from '@/components/Navigation/ApplicationBar.vue';

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
