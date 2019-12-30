<template>
    <span>
        <v-app-bar app>
            <!-- <v-icon ></v-icon> -->
            <v-btn @click.stop="$router.push('/')" icon>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <!-- <v-toolbar-title>Речная 113, кв.91</v-toolbar-title> -->

            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title>{{ device.name }}</v-list-item-title>
                    <!-- <v-list-item-subtitle>квартира, две строки текста помещаются</v-list-item-subtitle> -->
                </v-list-item-content>
            </v-list-item>

            <v-spacer></v-spacer>

            <!-- должен быть скатик! -->
            <aqua-bast-icon
                name="INFO"
                size="48px"
                color="primary"
            ></aqua-bast-icon>

            <template v-slot:extension>
                <v-tabs v-model="tab" fixed-tabs background-color="transparent">
                    <v-tabs-slider color="primary"></v-tabs-slider>
                    <v-tab
                        v-for="(item, i) in tabs"
                        :href="'#' + item.name"
                        :key="i"
                        class="priamary--text"
                    >
                        <aqua-bast-icon
                            :name="item.icon"
                            size="36px"
                            color="primary"
                        ></aqua-bast-icon>
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item, i) in tabs" :value="item.name" :key="i">
                <subdevice-sensor
                    v-for="(subdevice, i) in components.filter(subdevice => {
                        return true;
                    })"
                    :device="subdevice"
                    :key="i"
                />
            </v-tab-item>
        </v-tabs-items>
    </span>
</template>

<script>
//@click="expanded != getKey(component) ? expanded = getKey(component) : expanded = ''"

import AquaBastIcon from '@/components/SvgIcons/Icon.vue';
import SubdeviceSensor from '@/components/DeviceSensor.vue';
import { isUndefined } from 'util';

export default {
    components: {
        AquaBastIcon,
        SubdeviceSensor
    },

    mounted() {
        const uid = this.$route.params.uid;
        var dev = this.$store.state.devices.filter(function(d) {
            return d.uid == uid;
        });

        this.device = dev[0];
    },

    methods: {
        getKey(component) {
            window.console.log('expanded = ' + this.expanded);

            return (
                component.uid + '.' + component.type + '#' + component.number
            );
        },

        getComponentName(component) {
            return (
                this.$store.state.const.deviceDefaults[component.type].name +
                (1 + component.number)
            );
        },

        getComponentDescription(component) {
            return (
                this.$store.state.const.deviceDefaults[component.type]
                    .description + component.host
            );
        }
    },

    computed: {
        components() {
            if (
                !isUndefined(this.device) &&
                !isUndefined(this.device.components)
            ) {
                var items = this.device.components.map(function(item) {
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
            return null;
        },

        valves() {
            return this.components
                ? this.components.filter(item => {
                      return item.type == 'valve' || item.type == 'relay';
                  })
                : null;
        },

        sensors() {
            return this.components
                ? this.components.filter(item => {
                      return (
                          item.type == 'wireless_sensor' ||
                          item.type == 'wired_sensor'
                      );
                  })
                : null;
        }
    },

    data() {
        return {
            device: {},

            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

            expanded: '',

            tab: null,
            tabs: [
                { name: 'sensors', icon: 'sensor' },
                { name: 'drives', icon: 'valve-error' },
                { name: 'all', icon: 'subdevices' }
            ]
        };
    }
};
</script>

<style scoped></style>
