const {
  getDefaultConfiguration,
  hasDefaultConfiguration,
} = require("./default");
const {
  hasProductionConfigurations,
  getProductionConfigurations,
} = require("./production");
const { hasTestConfigurations, getTestConfigurations } = require("./test");

const environment = process.env.NODE_ENV;

module.exports = function (key) {
  switch (environment) {
    case "development":
      if (hasDefaultConfiguration(key)) {
        return getDefaultConfiguration(key);
      }
      return new Error(`${key} doesn't exist in ${environment} environment`);
    case "test": {
      if (hasTestConfigurations(key)) {
        return getTestConfigurations(key);
      }
      return new Error(`${key} doesn't exist in ${environment} environment`);
    }
    case "production": {
      if (hasProductionConfigurations(key)) {
        return getProductionConfigurations(key);
      }
      return new Error(`${key} doesn't exist in ${environment} environment`);
    }
  }
};
