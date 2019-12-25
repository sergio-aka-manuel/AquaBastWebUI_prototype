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
                    <v-list-item-title>{{ _device.name }}</v-list-item-title>
                    <!-- <v-list-item-subtitle>квартира, две строки текста помещаются</v-list-item-subtitle> -->
                </v-list-item-content>
            </v-list-item>

            <v-spacer></v-spacer>

            <!-- <v-icon>mdi-cloud-sync</v-icon> -->

            <v-btn icon>
                <!-- должен быть скатик! -->
                <v-icon>mdi-help-circle</v-icon>
            </v-btn>
        </v-app-bar>

        <div class="dashboard">
            <div class="infobox absolute-container">
                <v-layout justify-center>header</v-layout>
            </div>
            <div class="buttons absolute-container">
                <div class="dashboard-button button-top-left">tl</div>
                <div class="dashboard-button button-top-right">tr</div>
                <div class="dashboard-button button-bottom-left">bl</div>
                <div class="dashboard-button button-bottom-right">br</div>
            </div>
            <div class="indicator absolute-container">
                <indicator v-bind:_device="_device"></indicator>
                <div class="water-counter hot-water">
                    <div id="HotWaterCounter"></div>
                </div>
                <div class="water-counter cold-water">
                    <div id="ColdWaterCounter"></div>
                </div>
            </div>
            <div class="footer absolute-container">
                <v-bottom-navigation :value="activeBtn" grow absolute>
                    <template v-for="(item, i) in menuItems">
                        <v-btn :key="i" :to="getMenuItemPath(item.path)">
                            <span>{{ item.title }}</span>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-btn>
                    </template>
                </v-bottom-navigation>
            </div>
        </div>
    </span>
</template>

<script>
import Indicator from '@/components/DashboardIndicator.vue';

export default {
    components: {
        Indicator
    },

    methods: {
        getMenuItemPath(dest) {
            const path = '/' + dest + '/' + this._device.uid;
            // window.console.log(dest + ' -> ' + path);
            return path;
        }
    },

    computed: {
        _device() {
            const uid = this.$route.params.uid;
            var dev = this.$store.state.devices.filter(function(d) {
                return d.uid == uid;
            });

            // window.console.log(d);
            return dev[0];
        }
    },

    data() {
        return {
            activeBtn: -1,
            menuItems: [
                {
                    // title: 'Устройства',
                    icon: 'mdi-speedometer',
                    path: 'devices'
                },
                {
                    // title: 'Графики',
                    icon: 'mdi-chart-areaspline',
                    path: 'graphs'
                },
                {
                    // title: 'Журнал',
                    icon: 'mdi-calendar-multiple-check',
                    path: 'logs'
                },
                {
                    // title: 'Настройки',
                    icon: 'mdi-settings',
                    path: 'logs'
                }
            ]
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

    width: fit-content;
    line-height: normal;

    font-size: 7vmin;

    border-radius: 8px;
    border: 2px solid white;
    background: black;
}

.hot-water {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -130%);
    background: blueviolet;
}

.cold-water {
    left: 50%;
    top: 50%;
    transform: translate(-50%, 35%);
    background: blueviolet;
}

/* Portrait */
@media screen and (orientation: portrait) {
    .infobox {
        top: 0;
        left: 0%;
        width: 100%;
        height: 20%;
        background: blueviolet;
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
        background: blueviolet;
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
