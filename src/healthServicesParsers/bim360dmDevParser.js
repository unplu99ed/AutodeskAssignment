module.exports = (respnseData) => {
  let parsingResult = false;

  try {
    const data = JSON.parse(respnseData);
    parsingResult = data.status.overall.toLowerCase() === 'good';
  }
  catch (error) {
    parsingResult = false;
  }

  return parsingResult
}



