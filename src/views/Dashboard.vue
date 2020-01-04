<template>
    <span>
        <navigation :title="device.name" />

        <div class="dashboard">
            <div
                class="infobox absolute-container d-flex justify-space-around align-center"
            >
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

            <div class="buttons absolute-container">
                <div class="dashboard-button button-top-left">tl</div>
                <div class="dashboard-button button-top-right">tr</div>
                <div class="dashboard-button button-bottom-left">bl</div>
                <div class="dashboard-button button-bottom-right">br</div>
            </div>
            <div class="indicator absolute-container">
                <indicator v-bind:device="device"></indicator>
                <div class="water-counter hot-water">
                    <!-- <div id="HotWaterCounter"></div> -->
                    <water-counter
                        v-if="device.config.hotWaterCounterEnabled"
                        :value="hotWaterCounterValue"
                        integerColor="black"
                        fractionalColor="red"
                    />
                </div>
                <div class="water-counter cold-water">
                    <!-- <div id="ColdWaterCounter"></div> -->
                    <water-counter
                        v-if="device.config.coldWaterCounterEnabled"
                        :value="coldWaterCounterValue"
                        integerColor="black"
                        fractionalColor="red"
                    />
                </div>
            </div>
            <div class="footer absolute-container ">
                <div class="d-flex justify-space-around align-stretch">
                    <template v-for="(item, i) in menuItems">
                        <v-btn class="mt-1" :to="item.path" :key="i" text link>
                            <aqua-bast-icon
                                :name="item.icon"
                                size="40px"
                                color="primary"
                            ></aqua-bast-icon>
                        </v-btn>
                    </template>

                    <!-- <v-btn> </v-btn>
                    <v-btn text>
                        <aqua-bast-icon
                            name="LOGO"
                            color="secondary"
                            size="36px"
                        ></aqua-bast-icon>
                    </v-btn> -->
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import Navigation from '@/components/NavReturn.vue';
import Indicator from '@/components/DashboardIndicator.vue';
import AquaBastIcon from '@/components/SvgIcons/Icon.vue';
import WaterCounter from '@/components/SvgWaterCounter/WaterCounter.vue';

export default {
    components: {
        Indicator,
        Navigation,
        AquaBastIcon,
        WaterCounter
    },

    mounted() {
        setInterval(() => {
            this.coldWaterCounterValue += Math.random() * 30;
            this.hotWaterCounterValue += Math.random() * 10;
        }, 1100);
    },

    methods: {},

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
                    icon: 'devices',
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
            coldWaterCounterValue: 0
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
    position: relative;
    /* background: yellow; */
}

.dashboard-button {
    position: absolute;
    background: transparent;

    width: 20vmin;
    height: 20vmin;
}

.water-counter {
    position: absolute;
    /*background: green;*/

    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;

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

    .buttons {
        top: 20%;
        left: 0;
        width: 100%;
        height: 60%;
        /* background: red; */
    }

    .button-top-left {
        top: calc(15% - 10vmin);
        left: calc(15% - 10vmin);
        background: chartreuse;
    }

    .button-top-right {
        top: calc(15% - 10vmin);
        left: calc(85% - 10vmin);
        background: chartreuse;
    }

    .button-bottom-left {
        top: calc(85% - 10vmin);
        left: calc(15% - 10vmin);
        background: chartreuse;
    }

    .button-bottom-right {
        top: calc(85% - 10vmin);
        left: calc(85% - 10vmin);
        background: chartreuse;
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

    .buttons {
        top: 20%;
        left: 50%;
        width: 50%;
        height: 60%;
        /* background: red; */
    }

    .button-top-left {
        top: calc(25% - 10vmin);
        left: calc(50% - 30vmin);
        background: chartreuse;
    }

    .button-top-right {
        top: calc(25% - 10vmin);
        left: calc(50% + 10vmin);
        background: chartreuse;
    }

    .button-bottom-left {
        top: calc(75% - 10vmin);
        left: calc(50% - 30vmin);
        background: chartreuse;
    }

    .button-bottom-right {
        top: calc(75% - 10vmin);
        left: calc(50% + 10vmin);
        background: chartreuse;
    }
}
</style>
