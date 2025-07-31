const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners if needed
    },
    baseUrl: 'https://my-portfolio-czuk.vercel.app',
  },
  video: true, // ✅ this enables video recording
});
