/**
 * The Database used by the client
 */
const fs = require('fs');
const models = {
  User: require("./dbController"),
  Upload: require("./dbController"),
};
class Database {
  constructor() {
    for (const i in models) this[i.toLowerCase()] = new models[i](this, require(`./models/${i.toLowerCase()}.js`));
  }
}

module.exports = Database;
