const fetch = require('node-fetch');

class healthServiceRepo {
  constructor(name, url, parser) {
    this.name = name;
    this.url = url;
    this.parser = parser;
  }

  async getIsAlive() {
    try {
      const response = await fetch(this.url);
      return {
        name: this.name,
        status: await this.parser(await response.text())
      };
    }
    catch (error) {
      throw error;
    }
  }

}

module.exports = healthServiceRepo;