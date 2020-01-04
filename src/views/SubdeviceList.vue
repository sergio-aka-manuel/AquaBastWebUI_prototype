<template>
    <span>
        <navigation
            v-on:tab-changed="filter = $event"
            :title="device.name"
            :tabs="tabs"
        />

        <subdevice-card
            v-for="(item, i) in filteredSubdevices"
            :subdevice="item"
            :key="i"
        />
    </span>
</template>

<script>
//@click="expanded != getKey(component) ? expanded = getKey(component) : expanded = ''"
import Navigation from '@/components/NavReturn.vue';
import SubdeviceCard from '@/components/SubdeviceCard.vue';
import { isUndefined } from 'util';

export default {
    components: {
        Navigation,
        SubdeviceCard
    },

    created() {
        const uid = this.$route.params.uid;
        var dev = this.$store.state.devices.filter(function(d) {
            return d.uid == uid;
        });

        this.device = dev[0];
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
                    var _a = this.$store.state.const.deviceSortOreder[
                        a.type + '_' + a.state
                    ];
                    var _b = this.$store.state.const.deviceSortOreder[
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

            filter: null,
            tabs: [
                { name: 'sensors', icon: 'sensor' },
                { name: 'drives', icon: 'valve-error' },
                { name: 'all', icon: 'devices-light' }
            ]
        };
    }
};
</script>

<style scoped></style>
