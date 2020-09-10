import request from '../../utils/request';
 
export const getList = query => {
    
    return request({
        url: '/api/weChatApi/getList',
        method: 'GET',
        params: query

    });
}; 

export const update = query => {
    
    return request({
        url: '/api/weChatApi/update',
        method: 'PUT',
        params: query

    });
}; 

export const insert = query => {
    
    return request({
        url: '/api/weChatApi/insert',
        method: 'POST',
        params: query

    });
}; 

export const updateStatus = query => {
    
    return request({
        url: '/api/weChatApi/updateStatus',
        method: 'GET',
        params: query

    });
}; 
export const delete1 = query => {
    
    return request({
        url: '/api/weChatApi/delete',
        method: 'DELETE',
        params: query 
    });
}; 