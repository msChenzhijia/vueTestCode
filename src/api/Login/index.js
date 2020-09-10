import request from '../../utils/request';
let token=localStorage.getItem("token");
export const login = query => {
    
    return request({
        url: '/api/loginApi/login',
        method: 'POST',
        params: query

    });
};