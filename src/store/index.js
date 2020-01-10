import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,

    state: {
        count: 0,

        const: {
            webui: {
                host: 'https://sa100cloud.com',
                versionUrl: '/app/kv/aquabast/version',
            },

            version: {
                major: 0,
                minor: 1,
                date: ''
            },

            AquaBastRedColor: 'rgb(219, 43, 57)', //#DB2B39
            AquaBastBlueColor: 'rgb(1, 72, 138)', //#01488A
            AquaBastGrayColor: 'rgb(86, 86, 86)', //#565656

            wifiLevels: {
                undefined: {
                    name: 'wifi-offline',
                    color: 'error',
                    text: 'ошибка...'
                },
                0: { name: 'wifi-1', color: 'error', text: 'очень слабый' },
                1: { name: 'wifi-1', color: 'secondary', text: 'слабый' },
                2: { name: 'wifi-2', color: 'secondary', text: 'нормальный' },
                3: { name: 'wifi-3', color: 'secondary', text: 'сильный' }
            },

            radioLevels: {
                undefined: {
                    name: 'radio-offline',
                    color: 'error',
                    text: 'ошибка...'
                },
                0: { name: 'radio-0', color: 'error', text: 'очень слабый' },
                1: { name: 'radio-1', color: 'secondary', text: 'слабый' },
                2: { name: 'radio-2', color: 'secondary', text: 'нормальный' },
                3: { name: 'radio-3', color: 'secondary', text: 'сильный' }
            },

            powerLevels: {
                undefined: {
                    name: 'battery-offline',
                    color: 'error',
                    text: 'ошибка...'
                },
                0: { name: 'battery-empty', color: 'error', text: 'менее 5%' },
                1: { name: 'battery-10', color: 'secondary', text: '10%' },
                2: { name: 'battery-50', color: 'secondary', text: '50%' },
                3: { name: 'battery-75', color: 'secondary', text: '75%' },
                4: { name: 'battery-full', color: 'secondary', text: '100%' },
                5: {
                    name: 'battery-charging',
                    color: 'secondary',
                    text: 'заряжается'
                }
            },

            deviceStates: {
                // AquaBast C-PRO
                '0401_closed': {
                    color: 'secondary',
                    name: 'EMPTY',
                    text: 'Проток воды закрыт'
                },
                '0401_opened': {
                    color: 'secondary',
                    name: 'EMPTY',
                    text: 'Проток воды открыт'
                },

                // Проводной датчик
                wired_sensor_normal: {
                    color: 'primary',
                    name: 'sensor',
                    text: 'норма'
                },
                wired_sensor_error: {
                    name: 'sensor-offline',
                    color: 'error',
                    text: 'авария'
                },
                wired_sensor_leakage: {
                    name: 'sensor-leakage',
                    color: 'error',
                    text: 'протечка'
                },
                wired_sensor_disabled: {
                    name: 'sensor-offline',
                    color: 'secondary',
                    text: 'отключен'
                },

                // Радио датчик
                wireless_sensor_normal: {
                    name: 'sensor',
                    color: 'primary',
                    text: 'норма'
                },
                wireless_sensor_error: {
                    name: 'sensor-offline',
                    color: 'error',
                    text: 'авария'
                },
                wireless_sensor_leakage: {
                    name: 'sensor-leakage',
                    color: 'error',
                    text: 'протечка'
                },
                wireless_sensor_disabled: {
                    name: 'sensor-offline',
                    color: 'secondary',
                    text: 'отключен'
                }

                // Кран
                // valve: {
                //   opened: { name: 'valve-opened', color: 'primary' },
                //   closed: { name: 'valve-closed', color: 'primary' },
                //   error: { name: 'valve-error', color: 'error' },
                //   disabled: { name: 'valve-offline', color: 'secondary' }
                // }
            },

            deviceDefaults: {
                undefined: {
                    name: 'Неизвестное устройство #',
                    description: 'Подключено к Aquabast '
                },
                wired_sensor: {
                    name: 'Датчик №',
                    description: 'Подключен к AquaBast '
                },
                wireless_sensor: {
                    name: 'Радио датчик №',
                    description: 'Сопряжен с AquaBast '
                }
            },

            deviceSortOrder: {
                // Протечка
                wired_sensor_leakage: 0,
                wireless_sensor_leakage: 0,

                // Отказ датчика|привода
                wired_sensor_error: 1,
                wireless_sensor_error: 1,
                valve_error: 1,

                // Нормальное состояние, сначала датчики
                wired_sensor_normal: 2,
                wireless_sensor_normal: 2,
                valve_opened: 3,
                valve_closed: 3,
                relay: 4,

                // Отключенное состояние, сначала датчики
                wired_sensor_disabled: 5,
                wireless_sensor_disabled: 5,
                valve_disabled: 6,
                relay_disabled: 7
            },

            cloudStatusIcon: {
                mqtt: 'cloud',
                init: 'cloud-offline',
                device: 'cloud-online'
            }
        },

        //
        startAs: null,          // [ dev | app | page | local ]
        cloudStatus: 'init',    // [ init | mqtt | device ]

        credentials: {
            loggedIn: false,
            apiToken: '',
            name: 'Sergio',
            mail: 'sergio.rudenko@gmail.com',
            phone: '79185387721',

            mqtt: {
                host: 'test-cloud.bast.ru',
                port: 3883,
                path: '/mqtt'
            }
        },
        devices: [
            {
                type: '0401',
                uid: 'MTIzNDU2Nzg5MDEyMzQ1',
                config: {
                    hotWaterCounterEnabled: true,
                    coldWaterCounterEnabled: true
                },
                name: 'Речная 113, кв.91',
                description:
                    'Описание объекта установки системы и еще много-много буков',
                powerLevel: 3,
                radioLevel: 2,
                state: 'opened',
                subdevices: [
                    {
                        type: 'wired_sensor',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ2',
                        host: 'PRO',
                        number: 0,
                        name: 'Проводной датчик #1',
                        description:
                            'подключен к 1 разъему AquaBast C-PRO WiFi',
                        powerLevel: 1,
                        radioLevel: 2,
                        state: 'normal',
                        ts: 1
                    },
                    {
                        type: 'wireless_sensor',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ3',
                        host: 'PRO',
                        number: 0,
                        name: 'Радио датчик #1',
                        description: 'Сопряжен с AquaBast C-PRO WiFi',
                        powerLevel: 0,
                        radioLevel: 3,
                        state: 'leakage',
                        ts: 2
                    },
                    {
                        type: 'wireless_sensor',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ4',
                        host: 'PRO',
                        number: 1,
                        name: 'Радио датчик #2',
                        description: 'Сопряжен с AquaBast C-PRO WiFi',
                        powerLevel: 1,
                        radioLevel: 2,
                        state: 'leakage',
                        ts: 0
                    },
                    {
                        type: 'valve',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ5',
                        host: 'PRO',
                        number: 0,
                        name: '',
                        description: '',
                        powerLevel: 2,
                        radioLevel: 2,
                        state: 'opened',
                        ts: 0
                    },
                    {
                        type: 'valve',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ5',
                        host: 'PRO',
                        number: 1,
                        name: '',
                        description: '',
                        powerLevel: 2,
                        radioLevel: 2,
                        state: 'opened',
                        ts: 0
                    }
                ]
            },
            {
                type: '0401',
                uid: 'NTQzMjEwOTg3NjU0MzIx',
                name: 'Другой объект',
                description: 'Другой текст, соотсветственно',
                config: {
                    hotWaterCounterEnabled: false,
                    coldWaterCounterEnabled: false
                },
                powerLevel: 3,
                radioLevel: 2,
                state: 'closed',
                subdevices: [
                    {
                        type: 'wired_sensor',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ2',
                        host: 'PRO',
                        number: 0,
                        name: '',
                        description: '',
                        powerLevel: 1,
                        radioLevel: 3,
                        state: 'leakage'
                    },
                    {
                        type: 'wireless_sensor',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ3',
                        host: 'PRO',
                        number: 0,
                        name: '',
                        description: '',
                        powerLevel: 1,
                        radioLevel: 3,
                        state: 'normal'
                    },
                    {
                        type: 'wireless_sensor',
                        uid: 'MTIzNDU2Nzg5MDEyMzQ4',
                        host: 'PRO',
                        number: 1,
                        name: '',
                        description: '',
                        powerLevel: 3,
                        radioLevel: 3,
                        state: 'disabled'
                    }
                ]
            }
        ]
    },

    mutations: {
        increment(state) {
            state.count++;
        },

        setStartAs(state, data) {
            window.console.log('setStartAs:', data);
            state.startAs = data;
        },

        setCloudStatus(state, data) {
            window.console.log('cloudStatus:', data);
            state.cloudStatus = data;
        },

        updateDeviceText(state, data) {
            window.console.log('updateDeviceText');
            window.console.log('host = ' + data.deviceUid);
            window.console.log('uid = ' + data.componentUid);
            window.console.log('name = ' + data.name);
            window.console.log('desc = ' + data.description);

            const host_uid = data.deviceUid;
            const component_uid = data.componentUid;

            var host_device = state.devices.filter(function (h) {
                return h.uid == host_uid;
            })[0];

            window.console.log(host_device);

            var component_device = host_device.components.filter(function (c) {
                return c.uid == component_uid;
            })[0];

            window.console.log(component_device);

            component_device.name = data.name;
            component_device.description = data.description;
        }
    },

    actions: {},

    modules: {}
});
