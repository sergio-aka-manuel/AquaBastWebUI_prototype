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
                color="#01488a"
            ></aqua-bast-icon>
        </v-app-bar>

        <v-container>
            <v-card
                class="mb-2"
                color="default"
                :ripple="false"
                v-for="(component, i) in components"
                :key="i"
            >
                <div>
                    <v-row no-gutters>
                        <v-col cols="2" class="ma-auto">
                            <aqua-bast-icon
                                name="sensor"
                                color="secondary"
                            ></aqua-bast-icon>
                        </v-col>
                        <v-col>
                            <v-card-title class="px-1 py-2">
                                <span
                                    class="d-inline-block text-truncate font-weight-regular"
                                    style="max-width: 85%;"
                                    >{{ component.name }}</span
                                >
                                <v-spacer></v-spacer>
                            </v-card-title>
                            <v-card-subtitle class="px-1 py-2">{{
                                component.description
                            }}</v-card-subtitle>
                        </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-card-actions class="py-1">
                        <icon-radio-level
                            v-bind:level="component.state.radioLevel"
                            size="24px"
                        ></icon-radio-level>
                        <!-- <v-divider vertical></v-divider> -->
                        <icon-power-level
                            v-bind:level="component.state.powerLevel"
                        ></icon-power-level>

                        <v-spacer></v-spacer>
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-card-actions>
                </div>
            </v-card>
        </v-container>
    </span>
</template>

<script>
//@click="expanded != getKey(component) ? expanded = getKey(component) : expanded = ''"
// expanded != getKey(component) ? expanded = getKey(component) : expanded = ''
// import LeakageSensorCard from '@/components/LeakageSensorCard.vue';
// import LeakageSensorCardExpanded from '@/components/LeakageSensorCardExpanded.vue';

import IconPowerLevel from '@/components/IconPowerLevel.vue';
import IconRadioLevel from '@/components/IconRadioLevel.vue';
import AquaBastIcon from '@/components/SvgIcons/Icon.vue';

export default {
    components: {
        // LeakageSensorCard,
        // LeakageSensorCardExpanded,
        IconPowerLevel,
        IconRadioLevel,
        AquaBastIcon
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
        }
    },

    computed: {
        components() {
            return this.device.components;
        }
    },

    data() {
        return {
            device: {},
            expanded: ''
        };
    }
};
</script>

<style scoped></style>
