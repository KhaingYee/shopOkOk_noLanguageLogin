import qs from 'qs';
import axios from 'axios';

var HTTP = function(API_URL, params, requestType) {
    params.token = sessionStorage.getItem("data_token");
    var that = this;
    return new Promise((resolve, reject) => {
        if (requestType == 'post') {
            axios.post(API_URL, qs.stringify(params)).then((res) => {
                if (res.data.status == 10001) {
                    location.hash = '#/LogIn';
                } else if (res.data.status == 1) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        } else {
            axios({
                method: 'get',
                url: API_URL,
                params: params
            }).then((res) => {
                if (res.data.status == 10001) {
                    location.hash = '#/LogIn';
                } else if (res.data.status == 1) {
                    resolve(res);
                } else {
                    reject(res);
                }
            })
        }
    })
}
module.exports = HTTP;