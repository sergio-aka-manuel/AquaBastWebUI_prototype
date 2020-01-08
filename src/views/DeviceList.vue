<template>
    <span>
        <navigation title="AquaBast" :menu="menuItems" />

        <!-- TODO: replace with list container  -->
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
import Navigation from '@/components/Navigation/ApplicationBar.vue';
import DeviceCard from '@/components/DeviceCard.vue';

export default {
    name: 'DeviceList',

    components: {
        Navigation,
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
        return {
            menuItems: [
                // { heading: 'menu' },
                {
                    title: 'Журнал событий',
                    path: '/journal/all',
                    icon: 'journal'
                },
                {
                    title: 'Настройки',
                    path: '/settings/application',
                    icon: 'settings'
                },
                { divider: true },
                {
                    title: 'О программе',
                    path: '/about/application',
                    icon: 'INFO'
                }
            ]
        };
    }
};
</script>
