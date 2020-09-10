import request from '../../utils/request';
let token=localStorage.getItem("token");
export const logInfo = query => {
    
    return request({
        url: '/api/logInfo/getList',
        method: 'GET',
        params: query

    });
};