const express = require('express');
const HealthService = require('../services/healthService');

class healthServiceCntrl {

  constructor(configs) {
    this.healthService = new HealthService(configs.healthServices);
  }

  async GetHealthStatusesOfAllServices(req, res) {
    try {
      res.status(200).json(await this.healthService.GetHealthStatusesOfAllServices());
    }
    catch (error) {
      console.log('error in GetHealthStatusesOfAllServices', error);
      res.status(500).send(error);
    }
  }

  async GetServicesAvailability(req, res) {
    try {
      res.status(200).json(await this.healthService.GetServicesAvailability());
    }
    catch (error) {
      console.log('error in GetServicesAvailability', error);
      res.status(500).send(error);
    }
  }

  getRouter() {
    const router = express.Router();

    router.get('/HealthStatusesOfAllServices', this.GetHealthStatusesOfAllServices.bind(this));
    router.get('/ServicesAvailability', this.GetServicesAvailability.bind(this));

    return router;
  }
}

module.exports = healthServiceCntrl;