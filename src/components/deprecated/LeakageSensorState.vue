<template>
    <span>
        <v-row justify="start" align="center" class="caption">
            <v-col cols="2">
                <v-icon>{{ stateIcon }}</v-icon>
            </v-col>
            <v-col>
                <span>{{ stateTitle }}</span>
                <span class="font-weight-bold right-aligned">{{ stateText }}</span>
            </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-row justify="start" align="center" class="caption">
            <v-col cols="2">
                <icon-radio-level v-bind:level="state.radioLevel"></icon-radio-level>
            </v-col>
            <v-col>
                <span>{{ radio.title }}</span>
                <span class="font-weight-bold right-aligned">{{ radio.text }}</span>
            </v-col>
        </v-row>

        <v-row justify="start" align="center" class="caption">
            <v-col cols="2">
                <icon-power-level v-bind:level="state.powerLevel"></icon-power-level>
            </v-col>
            <v-col>
                <span>{{ power.title }}</span>
                <span class="font-weight-bold right-aligned">{{ power.text }}</span>
            </v-col>
        </v-row>
    </span>
</template>

<script>
import IconPowerLevel from '@/components/IconPowerLevel.vue';
import IconRadioLevel from '@/components/IconRadioLevel.vue';

export default {
    components: {
        IconPowerLevel,
        IconRadioLevel
    },

    props: {
        state: Object
    },

    computed: {
        stateIcon() {
            return 'mdi-signal-off';
        },

        stateText() {
            var _text = 'обрыв датчика';
            return _text;
        },

        power() {
            var _power = {
                title: 'Заряд батареи',
                text: ''
            };

            switch (this.state.powerLevel) {
                case 0:
                    _power.text += '0%';
                    break;

                case 1:
                    _power.text += '30%';
                    break;

                case 2:
                    _power.text += '70%';
                    break;

                case 3:
                    _power.text += '100%';
                    break;

                case 4:
                    _power.text += 'заряжается...';
                    break;

                default:
                    _power.text += 'ошибка...';
                    break;
            }
            return _power;
        },

        radio() {
            var _radio = {
                title: 'Уровень сигнала',
                text: ''
            };

            switch (this.state.radioLevel) {
                case 0:
                    _radio.text += '0%';
                    break;

                case 1:
                    _radio.text += '25%';
                    break;

                case 2:
                    _radio.text += '50%';
                    break;

                case 3:
                    _radio.text += '100%';
                    break;

                default:
                    _radio.text += 'ошибка...';
                    break;
            }
            return _radio;
        }
    },

    data() {
        return {
            stateTitle: 'Состояние',

            AquaBastRedColor: 'rgb(219, 43, 57)',
            AquaBastBlueColor: 'rgb(1, 72, 138)',
            AquaBastGrayColor: 'rgb(86, 86, 86)'
        };
    }
};
</script>

<style scoped>
  .right-aligned {
      float: right;
  }
</style>
