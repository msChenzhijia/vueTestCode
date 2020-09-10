import request from '../../utils/request';

export const getMessageList = query => {
    
    return request({
        url: '/api/systemMessageApi/getList',
        method: 'GET',
        params: query 
    });
};  

export const getAdminMessage = query => {
    
    return request({
        url: '/api/systemMessageApi/getAdminMessage',
        method: 'GET',
        params: query 
    });
};  

export const insert = query => {
    
    return request({
        url: '/api/systemMessageApi/insert',
        method: 'POST',
        params: query 
    });
};  

export const update = query => {
    
    return request({
        url: '/api/systemMessageApi/update',
        method: 'POST',
        params: query 
    });
};  

export const deleteMessage = query => { 
    return request({
        url: '/api/systemMessageApi/delete',
        method: 'get',
        params: query 
    });
};  


export const deleteAdminMessage = query => { 
    return request({
        url: '/api/systemMessageApi/adminMessageDelete',
        method: 'get',
        params: query 
    });
};  


export const updateAdminMessage = query => { 
    return request({
        url: '/api/systemMessageApi/adminMessageUpdate',
        method: 'POST',
        params: query 
    });
}; 


export const adminMessageInsert = query => { 
    return request({
        url: '/api/systemMessageApi/adminMessageInsert',
        method: 'POST',
        params: query 
    });
}; 
