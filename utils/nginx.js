const fetch = require('node-fetch');

module.exports = class NginxManager {
  constructor(config) {
    this.config = config;

    // Static Credentials
    this.host = config.nginx.host;
    this.username = config.nginx.username;
    this.password = config.nginx.password;

    // Dynamic Credentials
    this.jwt = null;
    this.expires = null;

  }
  async checkAuth() {
    await new Promise(async (resolve, reject) => {
      if (this.jwt && this.expires > Date.now()) return resolve(true)
      let d = await fetch(this.host + "/api/tokens", {
        body: JSON.stringify({
          identity: this.username,
          secret: this.password,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(r => r.json()).catch(reject)
      if (d.error) return reject(d.error)
      this.jwt = d.token;
      this.expires = new Date(d.expires).getTime() / 1000;
      resolve(true)
    })
    return
  }

  // Get Requests
  async getHosts() {
    return this._get("/api/nginx/proxy-hosts?expand=owner,access_list,certificate")
  }

  // Post Requests
  async createHost(domainName) {
    let body = {
      "domain_names": [
        domainName
      ],
      "forward_scheme": "http",
      "forward_host": "172.18.0.1",
      "forward_port": 3000,
      "allow_websocket_upgrade": true,
      "access_list_id": "0",
      "certificate_id": "new",
      "ssl_forced": true,
      "meta": {
        "letsencrypt_email": (Math.ceil(Math.random() * Date.now() * 5)).toString(36) + ".nginx@trit.wtf",
        "letsencrypt_agree": true,
        "dns_challenge": false
      },
      "advanced_config": "",
      "locations": [],
      "block_exploits": false,
      "caching_enabled": false,
      "http2_support": false,
      "hsts_enabled": false,
      "hsts_subdomains": false
    }
    return this._post("/api/nginx/proxy-hosts", {
      body: JSON.stringify(body)
    })
  }



  // API Request Functions
  async _post(url, data) {
    await this.checkAuth()
    return fetch(this.host + url, {
      ...data,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.jwt}`,
        'Content-Type': 'application/json',
      }
    }).then(r => r.json())
  }
  async _get(url, data) {
    await this.checkAuth()
    return fetch(this.host + url, {
      ...data,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.jwt}`,
        'Content-Type': 'application/json',
      }
    }).then(r => r.json())
  }
}