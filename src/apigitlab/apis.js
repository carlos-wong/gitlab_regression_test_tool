var axios = require('axios');
var _ = require('lodash');

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

  async QueryQAProject(token,page_index,per_page,history){
    var ret = await this.instance.get(`/projects?page=${page_index}&per_page=${per_page}&search=QA`);
    if(ret.data.length >= per_page){
      return await this.QueryQAProject(token,page_index+1,per_page,_.concat(history,ret.data));
    }
    else{
      return _.filter(_.concat(history,ret.data),value=>{return value.name === 'QA';}) ;
    }
  }

  async CreateIssue(token,project_url,title,description){
    return await this.instance.post('/projects/'+encodeURIComponent(project_url)+"/issues", {
      title: title,
      description: description
    });
  }
};

