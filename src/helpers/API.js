import axios from 'axios';

const API_URL = 'https://manaenckov.design/api/';

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
            console.error('Error API:', error);
        });
        return response ? response.data : [];
    }


    async SimpleGet() {
        let response = await this.send(API_URL, 'GET', `get`, null);
        console.log('API: ', 'SimpleGet', response);

        return response;
    }

    async SimplePost(data) {
        let response = await this.send(API_URL, 'POSH', `post`, data);
        console.log('API: ', 'SimplePost', response);

        return response;
    }

}

