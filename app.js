const HealthService = require('./src/services/healthService');
const healthService = new HealthService(require('./config').healthServices);


healthService.GetHealthStatusesOfAllServices().then(data => {
  obj = data.reduce((hash, result) => {
    hash[result.name] = result.status
    return hash;
  }, {});


  console.log(data)
})

setTimeout(() => {
  const results = healthService.GetServicesAvailability();
  console.log(results)
}, 15000);