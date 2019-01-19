module.exports = {
  data: './data',
  healthServices: [
    { name: '360-staging', url: 'https://360-staging.autodesk.com/health', PraserFileName: '360StagingParser.js' },
    { name: 'bim360dm-dev', url: 'https://bim360dm-dev.autodesk.com/health?self=true', PraserFileName: 'bim360dmDevParser.js' },
    { name: 'commands.bim360dm-dev', url: 'https://commands.bim360dm-dev.autodesk.com/health', PraserFileName: 'commands.bim360dmDevParser.js' },
  ],
  webServer: {
    port: 3000,
  }
}