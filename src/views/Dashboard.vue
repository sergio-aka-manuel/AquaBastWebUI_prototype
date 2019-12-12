
<template>
    <span>
        <div class="dashboard">
            <div class="infobox absolute-container">header</div>
            <div class="buttons absolute-container">
                <div class="dashboard-button button-top-left">tl</div>
                <div class="dashboard-button button-top-right">tr</div>
                <div class="dashboard-button button-bottom-left">bl</div>
                <div class="dashboard-button button-bottom-right">br</div>
            </div>
            <div class="indicator absolute-container">
                <indicator></indicator>
            </div>
            <div class="footer absolute-container">footer</div>
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

  /* Portrait */
  @media screen and (orientation: portrait) {
      .infobox {
          top: 0;
          left: 1%;
          width: 98%;
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
          top: 80%;
          left: 1%;
          width: 98%;
          height: 20%;
          background: blue;
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
          background: blue;
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
    components: {
        Indicator
    },

    data() {
        return {
            dialog: false
        };
    }
};
</script>
