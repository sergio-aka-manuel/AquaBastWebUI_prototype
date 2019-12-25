import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    count: 0,

    const: {
      AquaBastRedColor: 'rgb(219, 43, 57)', //#DB2B39
      AquaBastBlueColor: 'rgb(1, 72, 138)', //#01488A
      AquaBastGrayColor: 'rgb(86, 86, 86)', //#565656


      wifiLevelIcons: {
        undefined: { name: 'wifi-offline', color: 'error' },
        0: { name: 'wifi-1', color: 'error' },
        1: { name: 'wifi-1', color: 'secondary' },
        2: { name: 'wifi-2', color: 'secondary' },
        3: { name: 'wifi-3', color: 'secondary' }
      },

      radioLevelIcons: {
        undefined: { name: 'radio-offline', color: 'error' },
        0: { name: 'radio-0', color: 'error' },
        1: { name: 'radio-1', color: 'secondary' },
        2: { name: 'radio-2', color: 'secondary' },
        3: { name: 'radio-3', color: 'secondary' }
      },

      powerLevelIcons: {
        undefined: { name: 'battery-offline', color: 'error' },
        0: { name: 'battery-empty', color: 'error' },
        1: { name: 'battery-10', color: 'secondary' },
        2: { name: 'battery-50', color: 'secondary' },
        3: { name: 'battery-75', color: 'secondary' },
        4: { name: 'battery-full', color: 'secondary' },
        5: { name: 'battery-charging', color: 'secondary' }
      },

      deviceIcons: {
        // Проводной датчик
        wired_sensor_normal: { name: 'sensor', color: 'primary' },
        wired_sensor_error: { name: 'sensor-offline', color: 'error' },
        wired_sensor_leakage: { name: 'sensor-leakage', color: 'error' },
        wired_sensor_disabled: { name: 'sensor-offline', color: 'secondary' },

        // Радио датчик
        wireless_sensor_normal: { name: 'sensor', color: 'primary' },
        wireless_sensor_error: { name: 'sensor-offline', color: 'error' },
        wireless_sensor_leakage: { name: 'sensor-leakage', color: 'error' },
        wireless_sensor_disabled: { name: 'sensor-offline', color: 'secondary' }

        // Кран
        // valve: {
        //   opened: { name: 'valve-opened', color: 'primary' },
        //   closed: { name: 'valve-closed', color: 'primary' },
        //   error: { name: 'valve-error', color: 'error' },
        //   disabled: { name: 'valve-offline', color: 'secondary' }
        // }
      },

      deviceDefaults: {
        wired_sensor: { name: "Датчик №", description: 'Подключен к AquaBast ' },
        wireless_sensor: { name: "Радио датчик №", description: 'Сопряжен с AquaBast ' },
      }



    },

    credentials: {
      loggedIn: false,
      apiToken: '',
      username: 'Sergio',
      phone: '79185387721',
      mail: 'sergio.rudenko@gmail.com',
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
        description: 'Описание объекта установки системы и еще много-много буков',
        powerLevel: 3,
        radioLevel: 2,
        components: [
          {
            type: 'wired_sensor',
            uid: 'MTIzNDU2Nzg5MDEyMzQ2',
            host: 'PRO',
            number: 0,
            name: 'Проводной датчик #1',
            description: 'подключен к 1 разъему AquaBast C-PRO WiFi',
            powerLevel: 1,
            radioLevel: 2,
            state: "normal",
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
            state: "leakage",
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
            state: "leakage",
            ts: 0
          }

        ],
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
        state: {
          powerLevel: 3,
          radioLevel: 2,
        },
        components: [
          {
            type: 'wired_sensor',
            uid: 'MTIzNDU2Nzg5MDEyMzQ2',
            host: 'PRO',
            number: 0,
            name: '',
            description: '',
            powerLevel: 1,
            radioLevel: 3,
            state: "leakage",
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
            state: "normal",
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
            state: "disabled",
          }

        ],
      },
    ]

  },

  mutations: {
    increment(state) {
      state.count++;
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
