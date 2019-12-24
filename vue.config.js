var manifestJSON = require("./public/manifest.json");

module.exports = {
  // FIXME!: important!!!, do not remove!!!
  pwa: {
    themeColor: manifestJSON.theme_color,
    name: manifestJSON.short_name,
    msTileColor: manifestJSON.background_color
  },

  // отключение хэшей в именах файлов
  filenameHashing: true,

  transpileDependencies: ["vuetify"]
};
