<template>
    <v-card class="ma-2" color="default" :ripple="false">
        <v-row no-gutters>
            <v-col cols="2" v-show="!expanded">
                <v-row no-gutters>
                    <v-col class="ma-auto pt-1 px-0">
                        <aqua-bast-icon-device
                            :data="deviceStates"
                            :device="device"
                        ></aqua-bast-icon-device>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="6" class="ma-auto py-0 px-2">
                        <aqua-bast-icon-level
                            size="24px"
                            :data="radioLevels"
                            :level="device.radioLevel"
                        ></aqua-bast-icon-level>
                    </v-col>
                    <v-col cols="6" class="ma-auto py-0 px-0">
                        <aqua-bast-icon-level
                            size="24px"
                            :data="powerLevels"
                            :level="device.powerLevel"
                        ></aqua-bast-icon-level>
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-fade-transition>
                    <v-row no-gutters>
                        <v-card-title
                            v-if="!expanded"
                            class="px-1 py-1"
                            style="width: 85%;"
                        >
                            <span
                                class="d-inline-block text-truncate font-weight-regular"
                                v-text="name"
                            />
                        </v-card-title>

                        <v-text-field
                            v-else
                            required
                            v-model="name"
                            counter="32"
                            label="какой-то текст"
                            hint="Наименование устройства"
                            prepend-icon="mdi-square-edit-outline"
                            class="mx-4"
                        ></v-text-field>

                        <v-spacer></v-spacer>
                        <v-btn icon @click="expanded = !expanded">
                            <v-icon v-if="!expanded">mdi-chevron-down</v-icon>
                            <v-icon v-else>mdi-chevron-up</v-icon>
                        </v-btn>
                    </v-row>
                </v-fade-transition>

                <v-row no-gutters>
                    <v-card-subtitle v-if="!expanded" class="px-1 py-0">
                        {{ description }}
                    </v-card-subtitle>

                    <v-textarea
                        v-else
                        prepend-icon="mdi-square-edit-outline"
                        counter="128"
                        required
                        v-model="description"
                        hint="Описание подключения/установки"
                        class="mx-4"
                    ></v-textarea>
                </v-row>
            </v-col>
        </v-row>

        <div v-if="expanded">
            <v-divider class="mt-4 mx-2" />

            <v-row
                no-gutters
                justify="start"
                align="center"
                class="caption mx-4 mt-2"
            >
                <aqua-bast-icon-device
                    size="24px"
                    :data="deviceStates"
                    :device="device"
                ></aqua-bast-icon-device>

                <span class="ml-4" v-text="'Состояние:'" />
                <span
                    class="ml-auto font-weight-bold"
                    v-text="deviceStateText"
                />
            </v-row>

            <v-row
                no-gutters
                justify="start"
                align="center"
                class="caption mx-4 mt-2"
            >
                <aqua-bast-icon-level
                    size="24px"
                    :data="powerLevels"
                    :level="device.powerLevel"
                ></aqua-bast-icon-level>

                <span class="ml-4" v-text="'Заряд батареи:'" />
                <span
                    class="ml-auto font-weight-bold"
                    v-text="powerLevelText.text"
                />
            </v-row>

            <v-row
                no-gutters
                justify="start"
                align="center"
                class="caption mx-4 mt-2"
            >
                <aqua-bast-icon-level
                    size="24px"
                    :data="radioLevels"
                    :level="device.radioLevel"
                ></aqua-bast-icon-level>

                <span class="ml-4" v-text="'Уровень радиосигнала:'" />
                <span
                    class="ml-auto font-weight-bold"
                    v-text="radioLevelText.text"
                />
            </v-row>

            <v-divider class="mt-4 mx-2" />

            <v-card-actions>
                <v-btn
                    @click="restoreData()"
                    :disabled="!dataChanged"
                    color="default"
                    class="ml-8"
                    text
                    v-text="'Отмена'"
                />
                <v-spacer></v-spacer>
                <v-btn
                    @click="storeData()"
                    :disabled="!dataChanged"
                    color="warning"
                    class="mr-8"
                    text
                    v-text="'Сохранить'"
                />
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
import AquaBastIconLevel from '@/components/SvgIcons/IconLevel.vue';
import AquaBastIconDevice from '@/components/SvgIcons/IconDevice.vue';

export default {
    components: {
        AquaBastIconLevel,
        AquaBastIconDevice
    },

    props: {
        device: [Object],
        selected: []
    },

    methods: {
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
        name() {
            return this.device.name
                ? this.device.name
                : this.$store.state.const.deviceDefaults[this.device.type]
                      .name +
                      (1 + this.device.number);
        },

        description() {
            return this.device.description
                ? this.device.description
                : this.$store.state.const.deviceDefaults[this.device.type]
                      .description + this.device.host;
        },

        state() {
            return this.device.type + '_' + this.device.state;
        },

        deviceStates() {
            return this.$store.state.const.deviceStates;
        },

        radioLevels() {
            //return this.$store.state.const.wifiLevelIcons;
            return this.$store.state.const.radioLevels;
        },

        powerLevels() {
            return this.$store.state.const.powerLevels;
        },

        deviceStateText() {
            return this.deviceStates[this.state].text;
        },

        radioLevelText() {
            return {
                text: this.radioLevels[this.device.radioLevel].text,
                color: this.radioLevels[this.device.radioLevel].color
            };
        },

        powerLevelText() {
            return {
                text: this.powerLevels[this.device.powerLevel].text,
                color: this.powerLevels[this.device.powerLevel].color
            };
        }
    },
    data() {
        return {
            expanded: false
        };
    }
};
</script>
