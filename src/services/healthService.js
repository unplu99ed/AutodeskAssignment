config = require('../../config').healthServices;
const HealthServiceRepo = require('../repository/HealthServiceRepo');
const { CircularArray } = require('circular-array');
const PARSERS_LOCATIONS = '../healthServicesParsers'

const initHealthService = (healthServiceConfig) => {
  const praserLocaiton = PARSERS_LOCATIONS + '/' + healthServiceConfig.PraserFileName;
  return {
    config: healthServiceConfig,
    repo: new HealthServiceRepo(healthServiceConfig.name, healthServiceConfig.url, require(praserLocaiton)),
    cachedHistory: new CircularArray(60),
  };
}

class healthService {

  constructor(healthServiceConfigs) {
    this.healthServices = healthServiceConfigs.map(healthServiceConfig => {
      return initHealthService(healthServiceConfig);
    })
  }

  getIsServicesAlive() {
    return Promise.all(this.healthServices.map(healthService => healthService.repo.getIsAlive()));
  }

}

const healthServiceInstance = new healthService(config);
module.exports = healthServiceInstance
