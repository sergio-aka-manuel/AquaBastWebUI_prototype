<template>
    <div>
        <v-row no-gutters style="width: 100%" align="center" justify="center">
            <v-col cols="11">
                <div class="md-2">
                    <v-text-field
                        append-icon="mdi-square-edit-outline"
                        counter="32"
                        required
                        :label="defaultLeakageSensorName()"
                        v-model="name"
                        hint="Наименование устройства"
                    ></v-text-field>
                </div>
                <v-textarea
                    append-icon="mdi-square-edit-outline"
                    counter="128"
                    required
                    v-model="description"
                    hint="Описание подключения/установки"
                ></v-textarea>
                <leakage-sensor-state v-bind:state="component.state"></leakage-sensor-state>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn
                @click="restoreData()"
                :disabled="!dataChanged"
                class="ma-2"
                color="default"
                text
            >Отмена</v-btn>
            <v-spacer></v-spacer>
            <v-btn
                @click="storeData()"
                :disabled="!dataChanged"
                class="ma-2"
                color="warning"
                text
            >Сохранить</v-btn>
        </v-card-actions>
    </div>
</template>


<style scoped>
</style>

<script>
import LeakageSensorState from '@/components/LeakageSensorState.vue';

export default {
    components: {
        LeakageSensorState
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
