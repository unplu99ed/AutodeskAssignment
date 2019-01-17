class HealthServiceRepo {
  constructor(name, url, parser) {
    this.name = name;
    this.url = url;
    this.parser = parser;
  }

  async getIsAlive() {
    return true;
  }

}

module.exports = HealthServiceRepo;