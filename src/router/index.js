import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                // {
                //     path: '/icon',
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                //     meta: { title: '自定义图标' }
                // },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/systemMessage/Tabs.vue'),
                    meta: { title: '个人消息中心' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                }, {
                    // markdown组件
                    path: '/menuInfo',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/menu/index.vue'),
                    meta: { title: '菜单管理' }
                },{
                    // markdown组件
                    path: '/menuTreeInfo', 
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/menu/indexTree.vue'),
                    meta: { title: '菜单管理' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },{
                    // 菜单管理
                    path: '/systemInfo',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/system/index.vue'),
                    meta: { title: '系统设置' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                {
                    path: '/logInfo',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Log/index.vue'),
                    meta: { title: '系统日志' }
                },
                {
                    path: '/RoleInfo',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Role/index.vue'),
                    meta: { title: '角色列表' }
                },
                {
                    path: '/userInfo',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/UserInfo/index.vue'),
                    meta: { title: '人员列表' }
                }, {
                    path: '/personal',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/UserInfo/personal.vue'),
                    meta: { title: '个人详情' }
                },
                {
                    path: '/systemMessage',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/systemMessage/index.vue'),
                    meta: { title: '系统信息' }
                },
                {
                    path: '/weChatIndex',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/weChat/index.vue'),
                    meta: { title: '微信管理' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
