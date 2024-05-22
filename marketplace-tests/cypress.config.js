const { defineConfig } = require('cypress'); 
 
module.exports = defineConfig({ 
  e2e: { 
    baseUrl: "https://makeup.com.ua/ua/", 
    env: { 
      minPrice: "100", 
      maxPrice: "500" 
    }, 
    setupNodeEvents(on, config) { 
    } 
  } 
});