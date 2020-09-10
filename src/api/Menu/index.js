import request from '../../utils/request';

export const getList = query => {
    return request({
        url: '/api/menuInfoApi/getList',
        method: 'get',
        params: query
    });
};

export const getMenuInfoList = query => {
    return request({
        url: '/api/moduleInfoApi/getMenuInfoList',
        method: 'get',
        params: query
    });
};

export const insert = query => {
    return request({
        url: '/api/menuInfoApi/insert',
        method: 'POST',
        params: query
    });
};

export const delete1 = query => {
    return request({
        url: '/api/menuInfoApi/delete',
        method: 'GET',
        params: query
    });
};

export const update = query => {
    return request({
        url: '/api/menuInfoApi/update',
        method: 'POST',
        params: query
    });
};

