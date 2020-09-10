import request from '../../utils/request';

export const insert = query => {
    return request({
        url: '/api/sysSettingApi/insertSettingType',
        method: 'post',
        params: query
    });
};

export const getList = query => {
    return request({
        url: '/api/sysSettingApi/getList',
        method: 'get',
        params: query
    });
};

export const delete1 = query => {
    return request({
        url: '/api/sysSettingApi/delete',
        method: 'get',
        params: query
    });
};

export const sysSettingGetList = query => {
    return request({
        url: '/api/sysSettingApi/getChildList',
        method: 'get',
        params: query
    });
};

export const sysSettingInsert = query => {
    return request({
        url: '/api/sysSettingApi/insert',
        method: 'post',
        params: query
    });
};

export const sysSettingUpdate = query => {
    return request({
        url: '/api/sysSettingApi/sysSettingUpdate',
        method: 'post',
        params: query
    });
};

export const sysSettingDelete = query => {
    return request({
        url: '/api/sysSettingApi/sysSettingDelete',
        method: 'get',
        params: query
    });
};

export const sysSettingUpdateStatus = query => {
    return request({
        url: '/api/sysSettingApi/sysSettingUpdateStatus',
        method: 'get',
        params: query
    });
};

export const sysSettingTypeUpdateStatus = query => {
    return request({
        url: '/api/sysSettingApi/sysSettingTypeUpdateStatus',
        method: 'get',
        params: query
    });
};