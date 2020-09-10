import request from '../../utils/request';
let token=localStorage.getItem("token");
export const getUserInfo = query => {
    
    return request({
        url: '/api/adminInfo/getAdminInfo',
        method: 'GET',
        params: query

    });
}; 

export const update = query => {
    
    return request({
        url: '/api/adminInfo/update',
        method: 'POST',
        params: query

    });
}; 
export const resetPass = query => {
    
    return request({
        url: '/api/adminInfo/resetPass',
        method: 'POST',
        params: query

    });
}; 
export const getList = query => { 
    return request({
        url: '/api/adminInfo/getAdminInfoList',
        method: 'GET',
        params: query 
    });
}; 

export const getInfo = query => { 
    return request({
        url: '/api/adminInfo/getAdminInfo',
        method: 'GET',
        params: query 
    });
}; 