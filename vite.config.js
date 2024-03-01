import jsonImporter from "node-sass-json-importer";

export default {
  css: {
    preprocessorOptions: {
      scss: {
        importer: jsonImporter(),
      }
    }
  },

  server: {
    hmr: {
      overlay: false,
    },
  },
};