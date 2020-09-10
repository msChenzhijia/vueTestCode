import axios from 'axios';
import Vue from 'vue';
import App from '../App';
import router from '../router/index';
new Vue({
    router, 
    render: h => h(App)
}).$mount('#app');
var  service =null;
if (process.env.NODE_ENV == "development") {
    service= axios.create({
        // process.env.NODE_ENV === 'development' 来判断是否开发环境
        // easy-mock服务挂了，暂时不使用了
        baseURL: 'http://localhost:8080',
        timeout: 5000
    }); 
}else{
    service= axios.create({
        // process.env.NODE_ENV === 'development' 来判断是否开发环境
        // easy-mock服务挂了，暂时不使用了
        baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
        timeout: 5000
    }); 
}

service.interceptors.request.use(
    config => {
        config.headers["Authorization"]=localStorage.getItem('token');
        return config;
    },
    error => {       
        debugger
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
       
        console.log(error);
        let index=JSON.stringify(error).indexOf("401");
        if(index>-1){
             localStorage.removeItem("token");
             localStorage.removeItem("Ip");
             localStorage.removeItem("adminImage");
             localStorage.removeItem("cityname");
             localStorage.removeItem("addressInfo");
             localStorage.removeItem("adminName");
            router.push("/login");
        }
        return Promise.reject();
    }
);

export default service;
