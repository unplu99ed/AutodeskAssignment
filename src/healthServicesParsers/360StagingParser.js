const util = require('util');
const { parseString } = require('xml2js');

module.exports = async (respnseData) => {
  let parsingResult = false;
  
  try {
    const data = await util.promisify(parseString)(respnseData);
    parsingResult = data.HealthCheck.status[0].toLowerCase() === 'good';
  }
  catch (error) {
    parsingResult = false;
  }

  return parsingResult
}
