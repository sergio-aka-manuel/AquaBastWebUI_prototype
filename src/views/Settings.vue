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

        <div class="pa-2">
            <v-btn @click.stop="onClick()" block rounded text>REFRESH</v-btn>
        </div>
        <v-layout justify-center>
            <p>Reloaded: {{ reloaded }}</p>
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
    },

    mounted() {
        this.reloaded = localStorage.getItem('lastCodeUpdate');
    },

    methods: {
        onClick() {
            localStorage.setItem('lastCodeUpdate', this.reloaded);
            this.reloaded = Math.floor(Date.now() / 1000);
            window.location.reload();
        }
    },

    data() {
        return {
            reloaded: ''
        };
    }
};
</script>
