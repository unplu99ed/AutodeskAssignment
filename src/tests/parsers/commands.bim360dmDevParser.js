
const assert = require('chai').assert;
const parser = require('../../healthServicesParsers/commands.bim360dmDevParser');


describe('commands.bim360dmDevParser', function () {

  it('send expected data', async (done) => {
    const data = {
      time: "2019-01-17T18:34:25.001Z",
      service: "Command Processor",
      environment: "development",
      host: "N/A", "status": {
        db: { "status": "OK" },
        overall: "OK"
      },
      build: "41fae75b\n0.0.0-2805\n",
      duration: 5
    };

    const parseResult = parser(JSON.stringify(data));
    assert.equal(parseResult, true);
    done();
  });

  it('send unexpected data', async (done) => {
    const data = {
      time: "2019-01-17T18:34:25.001Z",
      service: "Command Processor",
      environment: "development",
      host: "N/A", "status": {
        db: { "status": "OK" },
        overall: "Moshe"
      }
    };

    const parseResult = parser(JSON.stringify(data));
    assert.equal(parseResult, false);
    done();
  });

  it('send missing data field', async (done) => {
    const data = {
      time: "2019-01-17T18:34:25.001Z",
      service: "Command Processor",
      environment: "development",
      host: "N/A", "status": {
        db: { "status": "OK" },
      }
    };

    const parseResult = parser(JSON.stringify(data));
    assert.equal(parseResult, false);
    done();
  });

  it('send empty data', async (done) => {
    const data = {};
    const parseResult = parser(JSON.stringify(data));
    assert.equal(parseResult, false);
    done();
  });

  it('send null data', async (done) => {
    const data = null;
    const parseResult = parser(JSON.stringify(data));
    assert.equal(parseResult, false);
    done();
  });

});