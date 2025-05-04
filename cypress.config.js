const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://gorest.co.in/public/v2/",
  },
  env: {
    token: "fc9d5f5c82da483a52289cccfaa7db393dd9cf86fe97257e6fb47f260e5ee2ea",
  },
});
