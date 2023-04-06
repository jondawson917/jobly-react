const axios = require("axios").default;

class API {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const BASE_URL = process.env.NODE_ENV === 'production' ?  "https://joblysearch.herokuapp.com" : "http://localhost:3001";

    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { authorization: `Bearer ${API.token}` };
    const params = method === "get" ? data : {};

    console.log("URL", `${url}`);
    console.log("Data", data);
    console.debug("Params", params);
    console.log("Headers", headers);

    try {
      console.log("Trying axios call...");
      return await axios({ url, method, data, params, headers });
    } catch (err) {
      let message = err.response.data.error.message;
      if (message.includes("Duplicate camp")) {
        return message.split("ID: ");
      }
      console.error("API Error:", err.stack);

      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes


  static async getCompanies(name){
    let res = await this.request(`companies`, {name});
    return res.companies;
  }
  /** Get list of jobs */
  static async getJobs(title){
    let res = await this.request(`jobs`, {title});
    return res.jobs;
  }

  static async login(data){
    let res = await this.request(`auth/token`, data, "post");
    console.log("Res in login", res);
    return res;
  }

  static async register(data){
    let res = await this.request(`auth/register`, data, "post");
    return res;
  }
  
  static async getUserInfo(username){
    let res = await this.request(`users/${username}`);
    return res;
  }
  static async updateUserInfo(username, data){
    let res = await this.request(`users/${username}`, data, "patch");
    return res;
  }
  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

}



export default API
