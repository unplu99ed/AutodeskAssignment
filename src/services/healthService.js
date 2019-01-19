// config = require('../../config').healthServices;
const HealthServiceRepo = require('../repository/healthServiceRepo');
const { CircularArray } = require('circular-array');
const PARSERS_LOCATIONS = '../healthServicesParsers'
const intervalConfig = 60 * 1000;

const initHealthService = (healthServiceConfig) => {
  const praserLocaiton = PARSERS_LOCATIONS + '/' + healthServiceConfig.PraserFileName;
  return {
    config: healthServiceConfig,
    repo: new HealthServiceRepo(healthServiceConfig.name, healthServiceConfig.url, require(praserLocaiton)),
    cachedHistory: new CircularArray(60),
  };
}

const updateResultsInServicesRepo = (instance, statusResults) => {
  instance.healthServices.forEach(service => {
    service.cachedHistory.push(statusResults[service.config.name]);
  });
}

const checkAndUpdateServicesHealth = async (instance) => {
  const statusResults = await instance.GetHealthStatusesOfAllServices()
  updateResultsInServicesRepo(instance, statusResults)
}

const scheduleCheck = async (interval, instance) => {
  await checkAndUpdateServicesHealth(instance)
  setTimeout(async () => {
    await scheduleCheck(interval, instance);
  }, interval);
}

const startScheduleCheck = (interval, instance) => {
  checkAndUpdateServicesHealth(instance);
  scheduleCheck(interval, instance);
}

const checkHistoryStatistics = (healthService) => {
  const cachedStatuses = healthService.cachedHistory.array();
  const cachedAvailability = cachedStatuses.filter((status => status === true));
  const availabilityPresentage = parseFloat(cachedAvailability.length) / parseFloat(cachedStatuses.length)
  return parseInt(availabilityPresentage * 100);
}

class healthService {

  constructor(healthServiceConfigs) {

    this.healthServices = healthServiceConfigs.map(healthServiceConfig => {
      return initHealthService(healthServiceConfig);
    })

    startScheduleCheck(intervalConfig, this);
  }

  async GetHealthStatusesOfAllServices() {
    const HealthStatusesOfAllServices = await Promise.all(this.healthServices.map(healthService => healthService.repo.getIsAlive()))
    return HealthStatusesOfAllServices.reduce((hash, result) => {
      hash[result.name] = result.status
      return hash;
    }, {});;
  }

  GetServicesAvailability() {
    return this.healthServices.reduce((hash, healthService) => {
      hash[healthService.config.name] = checkHistoryStatistics(healthService);
      return hash;
    }, {});
  }

}

module.exports = healthService
