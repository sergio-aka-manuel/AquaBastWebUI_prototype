<template>
    <span>
        <app-navigation />

        <device-card
            v-for="device in devices"
            :key="device.uid"
            :device="device"
        />

        <!-- <v-fab-transition>
            <v-btn
                v-show="!hidden"
                class="mb-0"
                color="pink"
                dark
                absolute
                bottom
                right
                fab
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition> -->
    </span>
</template>

<script>
// @ is an alias to /src
import AppNavigation from '@/components/NavSandwich.vue';
import DeviceCard from '@/components/DeviceCard.vue';

export default {
    name: 'DeviceList',

    components: {
        AppNavigation,
        DeviceCard
    },

    computed: {
        devices() {
            return this.$store.state.devices
                .filter(function(d) {
                    //FIXME! filter only target type devices
                    const targetType = '0401';
                    return d.type == targetType;
                })
                .sort(function(a, b) {
                    //TODO: sort devices by status|name
                    return a.name > b.name ? 1 : -1;
                });
        }
    },

    data() {
        return {};
    }
};
</script>
