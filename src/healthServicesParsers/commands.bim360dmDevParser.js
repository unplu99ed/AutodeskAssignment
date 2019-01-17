module.exports = (respnseData) => {
  const data = JSON.parse(respnseData);
  return data.status.overall.toLowerCase() === 'ok';
}