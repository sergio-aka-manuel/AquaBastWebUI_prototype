<template>
    <span>
        <!-- <navigation v-on:tab-selected="filter = $event" :title="device.name" /> -->

        <v-tabs grow v-model="filter" app>
            <v-tabs-slider color="warning"></v-tabs-slider>
            <v-tab v-for="(item, i) in tabs" :key="i" :href="'#' + item.name">
                <svg-icon :name="item.icon" size="36px" color="primary" />
            </v-tab>
        </v-tabs>

        <subdevice-card
            v-for="(item, i) in filteredSubdevices"
            :subdevice="item"
            :href="'#' + item.name"
            :key="i"
        />
    </span>
</template>

<script>
//@click="expanded != getKey(component) ? expanded = getKey(component) : expanded = ''"
// import Navigation from '@/components/Navigation/ApplicationBar.vue';
import SubdeviceCard from '@/components/SubdeviceCard.vue';
import SvgIcon from '@/components/Svg/Icon.vue';
import { isUndefined } from 'util';

export default {
    components: {
        // Navigation,
        SubdeviceCard,
        SvgIcon
    },

    created() {
        const uid = this.$route.params.uid;
        var dev = this.$store.state.devices.filter(function(d) {
            return d.uid == uid;
        });

        this.device = dev[0];

        if (this.tabs[1]) {
            this.filter = this.tabs[1].name;
        }
    },

    methods: {},

    computed: {
        subdevices() {
            if (
                !isUndefined(this.device) &&
                !isUndefined(this.device.subdevices)
            ) {
                var items = this.device.subdevices.map(function(item) {
                    return item;
                });

                return items.sort((a, b) => {
                    // Сортировка по типу устройства и состоянию
                    var _a = this.$store.state.const.deviceSortOrder[
                        a.type + '_' + a.state
                    ];
                    var _b = this.$store.state.const.deviceSortOrder[
                        b.type + '_' + b.state
                    ];

                    if (_a < _b) return -1;
                    else if (_a > _b) return 1;
                    else {
                        // При прочих равных: по времени (позже - выше)
                        if (a.ts > b.ts) return -1;
                        else if (a.ts < b.ts) return 1;
                    }
                    return 0;
                });
            }
            return undefined;
        },

        filteredSubdevices() {
            if (!isUndefined(this.subdevices))
                return this.subdevices.filter(item => {
                    if (this.filter == 'sensors')
                        return (
                            item.type == 'wireless_sensor' ||
                            item.type == 'wired_sensor'
                        );

                    if (this.filter == 'drives')
                        return item.type == 'valve' || item.type == 'relay';

                    // All
                    return true;
                });
            else return null;
        }
    },

    data() {
        return {
            device: {},

            expanded: '',

            filter: 'all',
            tabs: [
                { name: 'drives', icon: 'valve-error' },
                { name: 'all', icon: 'devices-light' },
                { name: 'sensors', icon: 'sensor' }
            ]
        };
    }
};
</script>

<style scoped></style>
