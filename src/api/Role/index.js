import request from '../../utils/request';
let token=localStorage.getItem("token");
export const getRoleInfo = query => {
    
    return request({
        url: '/api/role/getRoleList',
        method: 'GET',
        params: query 
    });
}; 

export const insertRoleInfo = query => {
    
    return request({
        url: '/api/role/insert',
        method: 'POST',
        params: query 
    });
}; 