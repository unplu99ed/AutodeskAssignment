const util = require('util');
const { parseString } = require('xml2js');

module.exports = async (respnseData) => {
  const data = await util.promisify(parseString)(respnseData);
  return data.HealthCheck.status[0].toLowerCase() === 'good';
}
