var axios = require('axios');

export default  class apis{
  async initInstance(token){
    this.token = token;
    this.instance = axios.create({
      baseURL: "http://www.lejuhub.com/api/v4",
      timeout: 10000,
      headers: { "PRIVATE-TOKEN": this.token}
    });
    let ret = await this.instance.get("/broadcast_messages");
    return ret;
  };
};

