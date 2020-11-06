import axios from 'axios';

const API_URL = 'https://manaenckov.design/api/king/';

axios.defaults.headers.common = {
  Accept: "application/json, text/plain, */*"
};

export default class API {
  async send(url, method = 'GET', action, data = {}) {
    const response = await axios({
      method,
      url: `${url}${action}`,
      data
    }).catch(error => {
      console.error("Error API:", error);
    });
    return response ? response.data : [];
  }

  async GetUser() {
    const response = await this.send(API_URL, "GET", "getUser", null);
    console.log("API: ", "GetUser", response);

    return response;
  }

  async SimplePost(data) {
    const response = await this.send(API_URL, "POST", "post", data);
    console.log("API: ", "SimplePost", response);

    return response;
  }
}
