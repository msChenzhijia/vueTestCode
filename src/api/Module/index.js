import request from '../../utils/request';

export const moduleGetList = query => {
    return request({
        url: '/api/moduleInfoApi/getList',
        method: 'get',
        params: query
    });
};

export const moduleInsert = query => {
    return request({
        url: '/api/moduleInfoApi/insert',
        method: 'POST',
        params: query
    });
};

export const moduleDelete = query => {
    return request({
        url: '/api/moduleInfoApi/delete',
        method: 'GET',
        params: query
    });
};

export const moduleUpdate = query => {
    return request({
        url: '/api/moduleInfoApi/update',
        method: 'POST',
        params: query
    });
};

