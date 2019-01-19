
const assert = require('chai').assert;
const parser = require('../../healthServicesParsers/bim360dmDevParser');


describe('bim360dmDevParser', function () {

  it('send expected data', async (done) => {
    const data = {"service":"bim360-dm","time":"2019-01-17T18:55:17.383Z","environment":"production","status":{"overall":"GOOD","active_record":"GOOD","redis":"GOOD","last_schema_version":20190117103508,"needs_migration":false,"db_connection_count":54,"self_machine_connection_count":0,"self_process_connection_count":2,"i18n":{"en":"Settings","en-GB":"Settings","de":"Einstellungen","es":"Configuración","fr":"Paramètres","ja":"設定","pt-BR":"Configurações","zh-Hans":"设置","nl":"Instellingen","sv":"Inställningar","hr":"Settings","da":"Indstillinger"}},"more_information":"please always refer to detailed health page for system health","build":{"revision":"a1d5390","deploy_date":"2019-01-17T13:11:28.000+00:00","assets_revision":"57c53ba"},"sid":"dm","host":"bim360-dm-app-dev-00bc61896e9dfebe5","request_duration":0.191730175};
    const parseResult = parser(JSON.stringify(data));
    assert.equal(parseResult, true);
    done();
  });

  it('send unexpected data', async (done) => {
    const data = {"service":"bim360-dm","time":"2019-01-17T18:55:17.383Z","environment":"production","status":{"overall":"OK","active_record":"GOOD","redis":"GOOD","last_schema_version":20190117103508,"needs_migration":false,"db_connection_count":54,"self_machine_connection_count":0,"self_process_connection_count":2,"i18n":{"en":"Settings","en-GB":"Settings","de":"Einstellungen","es":"Configuración","fr":"Paramètres","ja":"設定","pt-BR":"Configurações","zh-Hans":"设置","nl":"Instellingen","sv":"Inställningar","hr":"Settings","da":"Indstillinger"}},"more_information":"please always refer to detailed health page for system health","build":{"revision":"a1d5390","deploy_date":"2019-01-17T13:11:28.000+00:00","assets_revision":"57c53ba"},"sid":"dm","host":"bim360-dm-app-dev-00bc61896e9dfebe5","request_duration":0.191730175};
    const parseResult = parser(JSON.stringify(data));
    assert.equal(parseResult, false);
    done();
  });

  it('send missing data field', async (done) => {
    const data = {"service":"bim360-dm","time":"2019-01-17T18:55:17.383Z","environment":"production","status":{"active_record":"GOOD","redis":"GOOD","last_schema_version":20190117103508,"needs_migration":false,"db_connection_count":54,"self_machine_connection_count":0,"self_process_connection_count":2,"i18n":{"en":"Settings","en-GB":"Settings","de":"Einstellungen","es":"Configuración","fr":"Paramètres","ja":"設定","pt-BR":"Configurações","zh-Hans":"设置","nl":"Instellingen","sv":"Inställningar","hr":"Settings","da":"Indstillinger"}},"more_information":"please always refer to detailed health page for system health","build":{"revision":"a1d5390","deploy_date":"2019-01-17T13:11:28.000+00:00","assets_revision":"57c53ba"},"sid":"dm","host":"bim360-dm-app-dev-00bc61896e9dfebe5","request_duration":0.191730175};
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