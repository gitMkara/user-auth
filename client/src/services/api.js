import axios from 'axios';
import token from './token';

const postman = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

postman.interceptors.request.use(
    (req) => {
        const accesToken = token.getLocalAccessToken();
        if (accesToken) {
            console.log('header updated');
            postman.defaults.headers.common['authorization'] = accesToken;
        }
        //console.log(req);
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

postman.interceptors.response.use(
    (res) => {
        console.log(res.data);
        if (res.config.url == '/auth/login') {
            token.setUser(res.data);
            postman.defaults.headers.common['authorization'] =
                token.getLocalAccessToken();
        }

        return res;
    },
    async (err) => {
        if (err.response.data === 'TokenExpiredError') {
            

            //return postman(err.config);
        } else {
            return Promise.reject(err);
        }
    }
);

export default postman;
