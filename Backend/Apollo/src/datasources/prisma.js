const { RESTDataSource } = require('apollo-datasource-rest');

class PrismaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://eu1.prisma.sh/nik-malhotra-1a119d/recipez/dev';
  }
}

module.exports = PrismaAPI;