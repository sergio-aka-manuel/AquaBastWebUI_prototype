<template>
    <span>
        <v-layout justify-center>
            <h2>Devices page</h2>
        </v-layout>
        <v-layout justify-center>
            <p>uid: [ {{ this.$route.params.uid }} ]</p>
        </v-layout>

        <template>
            <v-expansion-panels>
                <v-expansion-panel v-for="(device, i) in _devices" :key="i">
                    <v-expansion-panel-header v-slot="{ open }" style=" padding-left: 0px">
                        <v-fade-transition leave-absolute>
                            <v-row v-if="open" style="width: 100%">
                                <v-list-item style=" padding-left: 36px; width: 100%">
                                    <v-list-item-content three-line>
                                        <v-list-item-title>{{ device.name }}</v-list-item-title>
                                        <v-list-item-subtitle>{{ device.description }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-row>
                            <v-row v-else no-gutters style="width: 100%">
                                <v-list-item style="width: 100%">
                                    <v-list-item-avatar>
                                        <v-col style="padding-right: 0px; padding-left: 0px">
                                            <v-icon>mdi-ferry mdi-48px</v-icon>
                                        </v-col>
                                        <v-col style="padding-right: 0px; padding-left: 0px">
                                            <icon-radio-level
                                                v-bind:level="device.state.radioLevel"
                                            ></icon-radio-level>
                                            <icon-power-level
                                                v-bind:level="device.state.powerLevel"
                                            ></icon-power-level>
                                        </v-col>
                                    </v-list-item-avatar>

                                    <v-list-item-content three-line>
                                        <v-list-item-title>{{ device.name }}</v-list-item-title>
                                        <v-list-item-subtitle>{{ device.description }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-row>
                        </v-fade-transition>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <leakage-sensor-state v-bind:state="device.state"></leakage-sensor-state>
                        <v-divider></v-divider>
                        <v-row justify="center" align="center" class="pa-5">
                            <v-btn class="ma-2">Свойства</v-btn>
                            <v-btn class="ma-2" color="warning">Подключить</v-btn>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </span>
</template>

<style scoped>
</style>

<script>
import LeakageSensorState from '@/components/LeakageSensorState.vue';
import IconPowerLevel from '@/components/IconPowerLevel.vue';
import IconRadioLevel from '@/components/IconRadioLevel.vue';

export default {
    components: {
        LeakageSensorState,
        IconPowerLevel,
        IconRadioLevel
    },

    computed: {
        _devices() {
            const uid = this.$route.params.uid;
            var dev = this.$store.state.devices.filter(function(d) {
                return d.uid == uid;
            });

            // window.console.log(d);
            return dev[0].components;
        }
    },

    data() {
        return {
            check: false
        };
    }
};
</script>
