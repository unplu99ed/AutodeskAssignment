const HealthServiceCntrl = require('../controllers/healthServiceCntrl');


module.exports = {
  register: function (app, configs) {
    const healthServiceCntrl = new HealthServiceCntrl(configs)
    app.use('/', healthServiceCntrl.getRouter());
  }
}
