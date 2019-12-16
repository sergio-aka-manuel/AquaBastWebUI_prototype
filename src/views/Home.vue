<template>
    <span>
        <v-layout justify-center>
            <h2>Home page</h2>
        </v-layout>
        <v-layout justify-center>
            <img alt="Under construction..." src="../assets/animated-gifs-under-construction.gif" />
        </v-layout>

        <v-layout justify-center>
            <p>lastCodeUpdate: {{_lastCodeUpdate}}</p>
        </v-layout>
        <v-layout justify-center>
            <p>dark mode: {{_darkMode}}</p>
        </v-layout>
    </span>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: 'home',
    components: {},

    computed: {
        _lastCodeUpdate() {
            return localStorage.getItem('lastCodeUpdate');
        },

        _darkMode() {
            return localStorage.getItem('darkMode');
        }
    }
};
</script>
