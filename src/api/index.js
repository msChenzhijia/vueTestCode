import request from '../utils/request';

export const getList = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
