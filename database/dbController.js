module.exports = class Controller {
  constructor(db, model) {
    this.db = db;
    this.model = model;

    // Mongoose Options
    this.refs = []
    this.checkRefs()
  }
  checkRefs() {
    let refs = []
    for (const key of Object.keys(this.model.schema.paths)) {
      const schema = this.model.schema.paths[key];
      if (schema.options.ref) {
        refs.push(schema.options.ref)
      }
    }
    this.refs = refs
  }
  async getOne(filter = {}) {
    return this.model.findOne(filter).populate(this.refs);
  }
  async create(data = {}) {
    let res = await this.model(data).save();
    //this.setRedis(`${client.config.redis.prefix}:${this.model}`);
    return res;
  }
  async delete(filter = {}) {
    let res = await this.model.deleteMany(filter)
  }
  async deleteOne(filter = {}) {
    return this.model.deleteOne(filter);
  }
  async get(filter = {}) {
    return this.model.find(filter);
  }

};
