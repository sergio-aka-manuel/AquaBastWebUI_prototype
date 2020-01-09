<template>
    <div>
        <navigation :title="device.name" />

        <div class="dashboard">
            <div class="infobox absolute-container ">
                <!-- <v-card width="90%" height="90%">
                    <v-card-title
                        class="text-truncate font-weight-regular pt-1"
                        >{{ _device.name }}</v-card-title
                    >

                    <v-card-subtitle class="font-weight-regular pb-1">{{
                        _device.description
                    }}</v-card-subtitle>
                </v-card> -->
            </div>

            <div class="indicator absolute-container">
                <!-- PEPSI -->
                <svg-indicator v-bind:device="device" />
                <!-- hot water counter -->
                <div class="water-counter hot-water">
                    <svg-water-counter
                        v-if="device.config.hotWaterCounterEnabled"
                        :value="hotWaterCounterValue"
                        integerColor="black"
                        fractionalColor="red"
                    />
                </div>
                <!-- cold water counter -->
                <div class="water-counter cold-water">
                    <svg-water-counter
                        v-if="device.config.coldWaterCounterEnabled"
                        :value="coldWaterCounterValue"
                        integerColor="black"
                        fractionalColor="red"
                    />
                </div>
            </div>

            <div class="dashboard-buttons absolute-container">
                <div class="dashboard-button dashboard-button-top-left">
                    <svg-button
                        name="tank-half"
                        :state="buttons.topLeft.state"
                        v-on:button-click="onClick('topLeft')"
                    />
                </div>
                <div class="dashboard-button dashboard-button-top-right">
                    <svg-button
                        name="refresh"
                        :state="buttons.topRight.state"
                        v-on:button-click="onClick('topRight')"
                    />
                </div>
                <div class="dashboard-button dashboard-button-bottom-left">
                    <svg-button
                        name="LOGO"
                        :state="buttons.bottomLeft.state"
                        v-on:button-click="onClick('bottomLeft')"
                    />
                </div>
                <div class="dashboard-button dashboard-button-bottom-right">
                    <svg-button
                        name="valve-opened"
                        :state="buttons.bottomRight.state"
                        v-on:button-click="onClick('bottomRight')"
                    />
                </div>
            </div>

            <div class="footer absolute-container ">
                <!-- buttons -->
                <div class="d-flex justify-space-around align-stretch">
                    <template v-for="(item, i) in menuItems">
                        <v-btn class="mt-1" :to="item.path" :key="i" text link>
                            <svg-icon
                                :name="item.icon"
                                size="48px"
                                color="primary"
                            />
                        </v-btn>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation/ApplicationBar.vue';
// import Navigation from '@/components/NavReturn.vue';

import SvgIcon from '@/components/Svg/Icon.vue';
import SvgButton from '@/components/Svg/Button.vue';
import SvgIndicator from '@/components/Svg/Indicator.vue';
import SvgWaterCounter from '@/components/Svg/WaterCounter.vue';

export default {
    components: {
        Navigation,
        SvgIcon,
        SvgButton,
        SvgIndicator,
        SvgWaterCounter
    },

    mounted() {
        setInterval(() => {
            this.coldWaterCounterValue += Math.random() * 30;
            this.hotWaterCounterValue += Math.random() * 10;
        }, 1100);
    },

    methods: {
        onClick(value) {
            if (this.buttons[value].state != 'disabled') {
                window.console.log('Clicked: ', value);
            }
        }
    },

    computed: {
        device() {
            const uid = this.$route.params.uid;
            var dev = this.$store.state.devices.filter(function(d) {
                return d.uid == uid;
            });

            // window.console.log(d);
            return dev[0];
        },

        menuItems() {
            return [
                {
                    title: 'Устройства',
                    icon: 'devices-black',
                    path: '/subdev/' + this.device.uid
                },
                {
                    title: 'Графики',
                    icon: 'charts',
                    path: '/charts/' + this.device.uid
                },
                {
                    title: 'Журнал',
                    icon: 'journal',
                    path: '/journal/' + this.device.uid
                },
                {
                    title: 'Настройки',
                    icon: 'settings',
                    path: '/settings/' + this.device.uid
                }
            ];
        }
    },

    data() {
        return {
            activeBtn: -1,
            hotWaterCounterValue: 0,
            coldWaterCounterValue: 0,

            buttons: {
                topLeft: {
                    state: 'disabled'
                },
                topRight: {
                    state: 'disabled'
                },
                bottomLeft: {
                    state: 'normal'
                },
                bottomRight: {
                    state: 'normal'
                }
            }
        };
    }
};
</script>

<style scoped>
.relative-container {
    position: relative;
}

.absolute-container {
    position: absolute;
}

.dashboard {
    width: 100%;
    height: 100%;
    position: absolute;
    /* background: yellow; */
}

.dashboard-button {
    width: 24vmin;
    height: 24vmin;
    position: absolute;
    background: transparent;
}

.water-counter {
    position: absolute;
    /*background: green;*/

    /* -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease; */

    width: 48vmin;
    line-height: normal;

    /* font-size: 7vmin; */
    /* border-radius: 8px; */
    /* border: 2px solid white; */
    /* background: black; */
}

.hot-water {
    left: 50%;
    top: 54%;
    transform: translate(-50%, -130%);
    /* background: blueviolet; */
}

.cold-water {
    left: 50%;
    top: 47%;
    transform: translate(-50%, 35%);
    /* background: blueviolet; */
}

/* Portrait */
@media screen and (orientation: portrait) {
    .infobox {
        top: 0;
        left: 0%;
        width: 100%;
        height: 20%;
        /* background: blueviolet; */
    }

    .indicator {
        top: calc(50% - 35vmin);
        left: calc(50% - 35vmin);
        width: 70vmin;
        height: 70vmin;
        /* background: green; */
    }

    .footer {
        top: 90%;
        left: 0%;
        width: 100%;
        height: 10%;
        /* background: blue; */
    }

    .dashboard-buttons {
        top: 20%;
        left: 0;
        width: 100%;
        height: 60%;
        /* background: red; */
    }

    .dashboard-button-top-left {
        top: calc(15% - 12vmin);
        left: calc(15% - 12vmin);
        /* background: chartreuse; */
    }

    .dashboard-button-top-right {
        top: calc(15% - 12vmin);
        left: calc(85% - 12vmin);
        /* background: chartreuse; */
    }

    .dashboard-button-bottom-left {
        top: calc(85% - 12vmin);
        left: calc(15% - 12vmin);
        /* background: chartreuse; */
    }

    .dashboard-button-bottom-right {
        top: calc(85% - 12vmin);
        left: calc(85% - 12vmin);
        /* background: chartreuse; */
    }
}

/* Landscape */
@media screen and (orientation: landscape) {
    .infobox {
        top: 0;
        left: 50%;
        width: 50%;
        height: 20%;
        /* background: blueviolet; */
    }

    .indicator {
        top: calc(50% - 35vmin);
        left: calc(25% - 35vmin);
        width: 70vmin;
        height: 70vmin;
        /* background: green; */
    }

    .footer {
        top: 80%;
        left: 50%;
        width: 50%;
        height: 20%;
        /* background: blue; */
    }

    .dashboard-buttons {
        top: 20%;
        left: 50%;
        width: 50%;
        height: 60%;
        /* background: red; */
    }

    .dashboard-button-top-left {
        top: calc(25% - 12vmin);
        left: calc(50% - 30vmin);
        /* background: chartreuse; */
    }

    .dashboard-button-top-right {
        top: calc(25% - 12vmin);
        left: calc(50% + 10vmin);
        /* background: chartreuse; */
    }

    .dashboard-button-bottom-left {
        top: calc(75% - 12vmin);
        left: calc(50% - 30vmin);
        /* background: chartreuse; */
    }

    .dashboard-button-bottom-right {
        top: calc(75% - 12vmin);
        left: calc(50% + 10vmin);
        /* background: chartreuse; */
    }
}
</style>
