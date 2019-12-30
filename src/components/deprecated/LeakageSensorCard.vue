<template>
    <div>
        <v-row no-gutters style="width: 100%">
            <v-col cols="2">
                <v-icon>mdi-chevron-down mdi-48px</v-icon>
            </v-col>

            <v-col cols="10">
                <v-card-title>
                    <span
                        class="d-inline-block text-truncate font-weight-regular"
                        style="max-width: 85%;"
                        >{{ name }}</span
                    >
                    <v-spacer></v-spacer>
                    <v-icon>mdi-chevron-down</v-icon>
                </v-card-title>
                <v-card-subtitle>{{ description }}</v-card-subtitle>
            </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-card-actions>
            <icon-radio-level
                v-bind:level="component.state.radioLevel"
            ></icon-radio-level>
            <v-divider vertical></v-divider>
            <icon-power-level
                v-bind:level="component.state.powerLevel"
            ></icon-power-level>

            <v-spacer></v-spacer>

            <!-- <v-chip color="green" small outlined>
                <v-icon left color="default">mdi-information</v-icon>Ok
            </v-chip>-->
        </v-card-actions>
    </div>
</template>

<style scoped></style>

<script>
import IconPowerLevel from '@/components/IconPowerLevel.vue';
import IconRadioLevel from '@/components/IconRadioLevel.vue';

export default {
    components: {
        IconPowerLevel,
        IconRadioLevel
    },

    props: {
        hostUid: String,
        component: Object
    },

    mounted() {
        this.defaultName = this.defaultLeakageSensorName();
        this.defaultDescription = this.defaultLeakageSensorDescription();

        this.restoreData();
    },

    methods: {
        defaultLeakageSensorName() {
            var _result = '';

            switch (this.component.type) {
                case 'wired_sensor':
                    _result = 'Датчик №' + (this.component.number + 1);
                    break;

                case 'wireless_sensor':
                    _result = 'Радио датчик №' + (this.component.number + 1);
                    break;

                default:
                    _result = 'Неизвестное устройство...';
            }

            return _result;
        },

        defaultLeakageSensorDescription() {
            var _result = '';

            switch (this.component.type) {
                case 'wired_sensor':
                    _result =
                        'Подключен к разъему №' +
                        (this.component.number + 1) +
                        ' AquaBast ' +
                        this.component.host;
                    break;

                case 'wireless_sensor':
                    _result = 'Сопряжен с AquaBast ' + this.component.host;
                    break;

                default:
                    _result = '...';
            }
            return _result;
        },

        storeData() {
            window.console.log('storeData:');
            window.console.log('name = ' + this.name);
            window.console.log('desc = ' + this.description);

            this.$store.commit('updateDeviceText', {
                deviceUid: this.hostUid,
                componentUid: this.component.uid,
                name: this.name,
                description: this.description
            });

            this.restoreData();
        },

        restoreData() {
            if (this.component.name == null || this.component.name == '') {
                this.name = this.defaultName;
            } else {
                this.name = this.component.name;
            }

            if (
                this.component.description == null ||
                this.component.description == ''
            ) {
                this.description = this.defaultDescription;
            } else {
                this.description = this.component.description;
            }
        }
    },

    computed: {
        dataChanged() {
            return (
                this.name != this.component.name ||
                this.description != this.component.description
            );
        }
    },

    data() {
        return {
            expanded: false,

            name: '',
            defaultName: '',

            description: '',
            defaultDescription: ''
        };
    }
};
</script>

<v-fade-transition v-slot:append>
                <!-- <v-icon v-if="task" @click="create">add_circle</v-icon> -->
                <leakage-sensor-card-expanded
                    :hostUid="$route.params.uid"
                    :component="component"
                    v-if="expanded == getKey(component)"
                ></leakage-sensor-card-expanded>
            </v-fade-transition>

<v-fade-transition v-slot:append v-if="expanded != getKey(component)">
                <div>
                    <v-row no-gutters style="width: 100%">
                        <v-col cols="2">
                            <v-icon>mdi-chevron-down mdi-48px</v-icon>
                        </v-col>

                        <v-col cols="10">
                            <v-card-title>
                                <span
                                    class="d-inline-block text-truncate font-weight-regular"
                                    style="max-width: 85%;"
                                    >{{ name }}</span
                                >
                                <v-spacer></v-spacer>
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-card-title>
                            <v-card-subtitle>{{ description }}</v-card-subtitle>
                        </v-col>
                    </v-row>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <icon-radio-level
                            v-bind:level="component.state.radioLevel"
                        ></icon-radio-level>
                        <v-divider vertical></v-divider>
                        <icon-power-level
                            v-bind:level="component.state.powerLevel"
                        ></icon-power-level>

                        <v-spacer></v-spacer>

                        <!-- <v-chip color="green" small outlined>
                <v-icon left color="default">mdi-information</v-icon>Ok
            </v-chip>-->
                    </v-card-actions>
                </div>
            </v-fade-transition>

<!-- </v-scale-transition> -->
<!-- <v-scale-transition> -->
<!-- <leakage-sensor-card
                :hostUid="$route.params.uid"
                :component="component"
                v-if="expanded != getKey(component)"
            ></leakage-sensor-card>-->
<!-- </v-scale-transition> -->
<!-- </v-expand-transition> -->
