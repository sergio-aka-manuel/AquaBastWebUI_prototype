<template>
    <span>
        <v-layout justify-center>
            <h2>Graphs page</h2>
        </v-layout>
        <v-layout justify-center>
            <p>UID: {{ this.$route.params.uid }}</p>
        </v-layout>

        <v-layout justify-center>
            <img alt="Under construction..." src="../assets/animated-gifs-under-construction.gif" />
        </v-layout>
    </span>
</template>


<style scoped>
</style>

<script>
export default {
    computed: {
        counter() {
            return this.$store.state.count;
        }
    }
};
</script>
