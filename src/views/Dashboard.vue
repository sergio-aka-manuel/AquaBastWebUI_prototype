
<template>
    <span>
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
                <indicator></indicator>
                <div class="water-counter hot-water">
                    <div id="HotWaterCounter">1</div>
                </div>
                <div class="water-counter cold-water">
                    <div id="ColdWaterCounter">2</div>
                </div>
            </div>
            <div class="footer absolute-container">
                <v-bottom-navigation :value="activeBtn" grow absolute>
                    <template v-for="(item, i) in items">
                        <v-btn :key="i" :to="item.path">
                            <span>{{item.title}}</span>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-btn>
                    </template>
                </v-bottom-navigation>
            </div>
        </div>
    </span>
</template>

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

<script>
import Indicator from '@/components/DashboardIndicator.vue';

export default {
    mounted() {
        window.console.log(this.$vuetify.application.top);

        // var od = new window.Odometer({
        //     el: document.getElementById('HotWaterCounter'),
        //     value: 0.05,
        //     // Any option (other than auto and selector) can be passed in here
        //     format: '(ddd),dd',
        //     //formatFunction: _counterFormat,
        //     theme: 'car'
        // });
        // od.update(0.05);
        // od = new window.Odometer({
        //     el: document.getElementById('ColdWaterCounter'),
        //     value: 123.45,
        //     // Any option (other than auto and selector) can be passed in here
        //     format: '(ddd),dd',
        //     //formatFunction: _counterFormat,
        //     theme: 'car'
        // });
        // od.update(123.45);
    },

    components: {
        Indicator
    },

    data() {
        return {
            dialog: false,
            activeBtn: -1,
            items: [
                {
                    title: 'Графики',
                    icon: 'mdi-chart-areaspline',
                    path: 'graphs'
                },
                {
                    title: 'Журнал',
                    icon: 'mdi-calendar-multiple-check',
                    path: 'logs'
                },
                {
                    title: 'Устройства',
                    icon: 'mdi-speedometer',
                    path: 'devices'
                }
            ]
        };
    }
};
</script>
