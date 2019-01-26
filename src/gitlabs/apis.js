var axios = require('axios');

var instance = null;

var apis = {};

module.exports = class apis{
  async initInstance(token){
    this.token = token;
    instance = axios.create({
      baseURL: "http://www.lejuhub.com/api/v4",
      timeout: 10000,
      headers: { "PRIVATE-TOKEN": this.token}
    });
    let ret = await instance.get("/broadcast_messages");
    return ret;
  };
};

