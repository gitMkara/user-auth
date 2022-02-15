import axios from 'axios';
import token from './token';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const postman = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

postman.interceptors.request.use(
    (req) => {
        if (req.url === '/auth/login') window.localStorage.clear();

        const accesToken = token.getLocalAccessToken();

        if (accesToken) {
            let decoded = jwt_decode(accesToken);
            let now = dayjs();
            let tokenTime = dayjs.unix(decoded.exp);
            console.log(now.isAfter(tokenTime));
            async function refresher() {
                if (now.isAfter(tokenTime)) {
                    const rs = await axios
                        .post('http://localhost:5000/api/auth/refresh', {
                            token: token.getLocalRefreshToken(),
                        })
                        .then((response) => {
                            const userStorage = token.getUser();
                            userStorage.accessToken = response.data.accessToken;
                            userStorage.refreshToken =
                                response.data.refreshToken;
                            token.setUser(userStorage);
                            postman.defaults.headers.common['authorization'] =
                                response.data.accessToken;
                            postman('/user/test');
                            return response;
                        });

                    // const userStorage = token.getUser();
                    // userStorage.accessToken = rs.data.accessToken;
                    // userStorage.refreshToken = rs.data.refreshToken;
                    // token.setUser(userStorage);
                    // postman.defaults.headers.common['authorization'] =
                    //     rs.data.accessToken;
                } else {
                    postman.defaults.headers.common['authorization'] =
                        accesToken;
                }
            }
            refresher();
        }

        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

postman.interceptors.response.use(
    (res) => {
        console.log(res.data);
        console.log('res');
        if (res.config.url === '/auth/login') {
            window.localStorage.clear();
            token.setUser(res.data);
            postman.defaults.headers.common['authorization'] =
                token.getLocalAccessToken();
        }

        return res;
    },
    async (err) => {
        //return Promise.reject(err);
    }
);

export default postman;
