<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">后台管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img :src="headerImage" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{name}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="show">个人信息</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dialog title="个人设置" width="70%" :visible.sync="dialogTableVisible">
                    <personal>
                        
                    </personal>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import {getUserInfo} from '../../api/User/index'
import {getMessageList,getUnReadList} from '../../api/systemMessage/index'
import bus from '../common/bus';
import personal from '../common/personal'
export default {
    data() {
        return {
            ws:null,
            dialogTableVisible:false,
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 0,
            headerImage:''
        };
    }, 
    components:{ 
        personal
    },
    computed: {
        username() { 
         
          
        }
    },
    created(){
    this.getBasicInfo() 
    },
    methods: {
        //初始化WebSocket
        initWebSocket(){
            let that=this;
            if(window.WebSocket){
                 let url="ws://localhost:8081/socket/1";
                 let ws=new WebSocket(url);
                 that.ws=ws;
                 ws.onopen=function(e){
                    //console.log("服务器连接成功:"+url);
                 };
                 ws.onclose=function(e){
                     //console.log("服务器连接关闭:"+url);
                 };
                 ws.onerror=function(e){
                     //console.log("服务器连接出错:"+url);
                 };
                 ws.onmessage=function(e){
                     that.message=e.data;
                     
                 }
                
            }
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('token');
                localStorage.removeItem('addressInfo');
                    localStorage.removeItem('adminImage');
                localStorage.removeItem('adminName');
                this.$router.push('/login');
            }else if (command == 'show') {
                this.dialogTableVisible=true
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        /**
         * 获取基本信息
         * **/
        getBasicInfo(){  
            this.name=localStorage.getItem("adminName");
            this.headerImage=localStorage.getItem("adminImage") 
            getUnReadList().then(a=>{    
                this.message=a.object.unread.length;
                console.log(this.message) 
            })
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        };
        this.initWebSocket();
        
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
