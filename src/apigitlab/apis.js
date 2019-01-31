var axios = require('axios');

export default  class apis{

  async initInstance(token){
    this.token = token;
    this.instance = axios.create({
      baseURL: "http://www.lejuhub.com/api/v4",
      timeout: 10000,
      headers: { "PRIVATE-TOKEN": this.token}
    });
    let ret = await this.instance.get("/todos");
    return ret;
  };

  async CreateIssue(token,project_url,title,description){
    return await this.instance.post('/projects/'+encodeURIComponent(project_url)+"/issues", {
      title: title,
      description: description
    });
  }
};
