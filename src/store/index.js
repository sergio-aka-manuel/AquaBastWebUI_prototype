import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
    count: 0,

    const: {
      AquaBastRedColor: 'rgb(219, 43, 57)',
      AquaBastBlueColor: 'rgb(1, 72, 138)', //#01488A
      AquaBastGrayColor: 'rgb(86, 86, 86)'
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
        uid: 'MTIzNDU2Nzg5MDEyMzQ1',
        type: '0401',
        name: 'Речная 113, кв.91',
        description: 'Описание объекта установки системы и еще много-много буков',
        config: {
          hotWaterCounterEnabled: true,
          coldWaterCounterEnabled: true
        },
        state: {
          powerLevel: 3,
          radioLevel: 2,
        },
        components: [
          {
            uid: 'MTIzNDU2Nzg5MDEyMzQ2',
            host: 'PRO',
            type: 'wired_sensor',
            number: 0,
            name: 'Проводной датчик #1',
            description: 'подключен к 1 разъему AquaBast C-PRO WiFi',
            config: {
              enabled: true,
            },
            state: {
              powerLevel: 3,
              radioLevel: 2,
              leakage: false,
              error: 0
            },
          },
          {
            uid: 'MTIzNDU2Nzg5MDEyMzQ3',
            host: 'PRO',
            type: 'wireless_sensor',
            number: 0,
            name: 'Радио датчик #1',
            description: 'Сопряжен с AquaBast C-PRO WiFi',
            config: {
              enabled: true,
            },
            state: {
              powerLevel: 3,
              radioLevel: 2,
              leakage: false,
              error: 0
            },
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
            uid: 'MTIzNDU2Nzg5MDEyMzQ2',
            host: 'PRO',
            type: 'wired_sensor',
            number: 0,
            name: '',
            description: '',
            config: {
              enabled: true,
            },
            state: {
              powerLevel: 3,
              radioLevel: 2,
              leakage: false,
              error: 0
            },
          },
          {
            uid: 'MTIzNDU2Nzg5MDEyMzQ3',
            host: 'PRO',
            type: 'wireless_sensor',
            number: 0,
            name: '',
            description: '',
            config: {
              enabled: true,
            },
            state: {
              powerLevel: 3,
              radioLevel: 2,
              leakage: false,
              error: 0
            },
          },
          {
            uid: 'MTIzNDU2Nzg5MDEyMzQ4',
            host: 'PRO',
            type: 'wireless_sensor',
            number: 1,
            name: '',
            description: '',
            config: {
              enabled: true,
            },
            state: {
              powerLevel: 3,
              radioLevel: 2,
              leakage: false,
              error: 0
            },
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
