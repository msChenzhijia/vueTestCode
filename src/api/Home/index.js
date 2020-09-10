import request from '../../utils/request'; 
export const getClientIp = query => {
    
    return request({
        url: '/api/baiDu/getClientIp',
        method: 'GET',
        params: query

    });
};

export const getBasicInfo = query => {
    
    return request({
        url: '/api/homeApi/getBasicInfo',
        method: 'GET',
        params: query

    });
};

//获取菜单信息
export const getModuleMenuInfo = query => {
    
    return request({
        url: '/api/homeApi/getModuleMenuInfo',
        method: 'GET',
        params: query

    });
};