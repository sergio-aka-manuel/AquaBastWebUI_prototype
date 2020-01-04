<template>
    <v-card class="ma-2" color="default" :ripple="false">
        <v-row no-gutters>
            <transition name="fade" mode="out-in">
                <v-col cols="2" v-show="!expanded">
                    <subdevice-complex-icon :subdevice="subdevice" />
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
                                >{{ name }}</span
                            >
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
                            <v-icon>
                                {{
                                    expanded
                                        ? 'mdi-chevron-up'
                                        : 'mdi-chevron-down'
                                }}
                            </v-icon>
                        </v-btn>
                    </transition>
                </v-row>

                <v-row no-gutters>
                    <transition name="fade" mode="out-in">
                        <v-card-subtitle v-if="!expanded" class="px-1 py-0">
                            <span>{{ description }}</span>
                        </v-card-subtitle>

                        <v-textarea
                            v-else
                            required
                            v-model="description"
                            prepend-icon="mdi-square-edit-outline"
                            hint="Описание подключения/установки"
                            counter="128"
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
                    <svg-icon-device
                        size="24px"
                        :data="deviceStates"
                        :device="subdevice"
                    />

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
                    <svg-icon-level
                        size="24px"
                        :data="powerLevels"
                        :level="subdevice.powerLevel"
                    />

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
                    <svg-icon-level
                        size="24px"
                        :data="radioLevels"
                        :level="subdevice.radioLevel"
                    />

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
import SvgIconDevice from '@/components/Svg/IconDevice.vue';
import SvgIconLevel from '@/components/Svg/IconLevel.vue';

import { isUndefined } from 'util';

export default {
    components: {
        SubdeviceComplexIcon,
        SvgIconDevice,
        SvgIconLevel
    },

    props: {
        subdevice: [Object],
        selected: []
    },

    methods: {},

    computed: {
        textSource() {
            const src = this.$store.state.const.deviceDefaults;
            return isUndefined(src[this.subdevice.type])
                ? src['undefined']
                : src[this.subdevice.type];
        },

        name() {
            return this.subdevice.name
                ? this.subdevice.name
                : this.textSource.name + (1 + this.subdevice.number);
        },

        description() {
            return this.subdevice.description
                ? this.subdevice.description
                : this.textSource.description + this.subdevice.host;
        },

        state() {
            return this.subdevice.type + '_' + this.subdevice.state;
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
                text: this.radioLevels[this.subdevice.radioLevel].text,
                color: this.radioLevels[this.subdevice.radioLevel].color
            };
        },

        powerLevelText() {
            return {
                text: this.powerLevels[this.subdevice.powerLevel].text,
                color: this.powerLevels[this.subdevice.powerLevel].color
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
