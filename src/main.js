import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI,{Loading} from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import 'cropperjs/dist/cropper.css';
import './components/common/directives';
import 'font-awesome/css/font-awesome.css'
import 'babel-polyfill';
import {verification} from './utils/tool'
//添加图片上传组件
import VueCropper from 'vue-cropperjs';
Vue.component(VueCropper);
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});

const i18n = new VueI18n({
    locale: 'zh',
    messages
});
Vue.prototype.verification=verification;
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('token');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

Vue.prototype.openLoading=function(val){
    const loading = this.$loading({           // 声明一个loading对象
        lock: true,                             // 是否锁屏
        text: val,                     // 加载动画的文字
        spinner: 'el-icon-loading',             // 引入的loading图标
        background: 'rgba(0, 0, 0, 0.3)',       // 背景颜色
        target: '.sub-main',                    // 需要遮罩的区域
        body: true,                              
        customClass: 'mask'                     // 遮罩层新增类名
      })
      setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
        loading.close();                        // 关闭遮罩层
      },5000)
      return loading;
}

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
