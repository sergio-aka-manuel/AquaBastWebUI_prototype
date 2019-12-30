<template>
    <v-card class="ma-2" color="default" :ripple="false">
        <v-row no-gutters>
            <transition name="fade" mode="out-in">
                <v-col cols="2" v-show="!expanded">
                    <subdevice-complex-icon :subdevice="device" />
                </v-col>
            </transition>
            <v-col>
                <v-row no-gutters>
                    <transition name="fade" mode="out-in">
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
                    </transition>

                    <v-spacer></v-spacer>

                    <transition name="fade" mode="out-in">
                        <v-btn
                            icon
                            :key="expanded"
                            @click="expanded = !expanded"
                        >
                            <v-icon>{{
                                expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
                            }}</v-icon>
                        </v-btn>
                    </transition>
                </v-row>

                <v-row no-gutters>
                    <transition name="fade" mode="out-in">
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
                    </transition>
                </v-row>
            </v-col>
        </v-row>

        <transition name="fade" mode="out-in">
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
                        :disabled="!unsaved"
                        color="default"
                        class="ml-8"
                        text
                        v-text="'Отмена'"
                    />
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="storeData()"
                        :disabled="!unsaved"
                        color="warning"
                        class="mr-8"
                        text
                        v-text="'Сохранить'"
                    />
                </v-card-actions>
            </div>
        </transition>
    </v-card>
</template>

<script>
import SubdeviceComplexIcon from '@/components/SubdeviceComplexIcon.vue';
import AquaBastIconLevel from '@/components/SvgIcons/Level.vue';
import AquaBastIconDevice from '@/components/SvgIcons/Device.vue';

export default {
    components: {
        SubdeviceComplexIcon,
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
            expanded: false,
            unsaved: false
        };
    }
};
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
    transition: all 1.5s ease;
}
.fade-leave-active {
    transition: all 1.5s sease;
}
.fade-enter {
    /* transform: translateX(-10px); */
    opacity: 0;
}
.fade-leave-to {
    /* transform: translateY(-10px); */
    opacity: 0;
}
</style>
