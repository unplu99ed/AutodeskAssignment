const assert = require('chai').assert;
const parser = require('../../healthServicesParsers/360StagingParser');


describe('360StagingParser', function () {

  it('send expected data', async (done) => {
    const data = '<?xml version="1.0" encoding="utf-8"?>' +
      '<HealthCheck xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      '<exception />' +
      '<machineName>IP-AC18616C</machineName>' +
      '<status>Good</status>' +
      '<date>2019-01-17T18:28:23.4460549+00:00</date>' +
      '<build>Api.Staging.01.14.2019.260.master.53ec17c</build>' +
      '</HealthCheck>';
    const parseResult = await parser(data);
    assert.equal(parseResult, true);
    done();
  });

  it('send unexpected data', async (done) => {
    const data = '<?xml version="1.0" encoding="utf-8"?>' +
      '<HealthCheck xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      '<sttus>Good</sttus>' +
      '<date>2019-01-17T18:28:23.4460549+00:00</date>' +
      '</HealthCheck>';
    const parseResult = await parser(data);
    assert.equal(parseResult, false);
    done();
  });

  it('send invalid XML data', async (done) => {
    const data = '<?xml version="1.0" encoding="utf-8"?>' +
      '<HealthCheck xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
      '<sttus>Good</status>' +
      '<date>2019-01-17T18:28:23.4460549+00:00</date>' +
      '</HealthCheck>';
    const parseResult = await parser(data);
    assert.equal(parseResult, false);
    done();
  });

  it('send empty data', async (done) => {
    const data = '';
    const parseResult = await parser(data);
    assert.equal(parseResult, false);
    done();
  });

  it('send null data', async (done) => {
    const data = null;
    const parseResult = await parser(data);
    assert.equal(parseResult, false);
    done();
  });

});