const chalk = require('chalk'), moment = require("moment");
module.exports = class Logger {
  constructor(config) { this.config = config }
  get timestamp() {
    return `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`
  }

  log(content) {
    return console.log(`${this.timestamp} ${chalk.bgBlue('LOG')} ${content} `);
  }

  debug(content) {
    if (!this.config.debug) return;
    return console.log(`${this.timestamp} ${chalk.green('DEBUG')} ${content}`);
  }

  error(content) {
    return console.log(`${this.timestamp} ${chalk.bgRed('ERROR')} ${content} `);
  }

  warn(content) {
    return console.log(`${this.timestamp} ${chalk.black.bgYellow('WARN')} ${content} `);
  }

  info(content) {
    return console.log(`${this.timestamp} ${chalk.blue('INFO')} ${content}`);
  }

  ready(content) {
    return console.log(`${this.timestamp} ${chalk.black.bgGreen('READY')} ${content}`);
  }
}