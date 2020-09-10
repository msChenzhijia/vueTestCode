<template>
    <div>
        <div class="crumbs">
            
        </div>
        <div class="container"> 
       
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="网页图标" name="first">
                <div class="search-box">
                <el-input class="search" size="large" v-model="keyword" clearable placeholder="请输入图标名称"></el-input>
            </div>
            <ul>
                <li class="icon-li" v-for="(item,index) in iconPageList" :key="index" @dblclick="selectIcon(item)">
                    <div class="icon-li-content">
                        <!-- <i :class="`el-icon-lx-${item}`"></i> -->
                        <i  :class="`fa fa-${item}`"></i>
                        <span>{{item}}</span>
                    </div>
                </li>
            </ul>
            <el-pagination  
                small 
                :page-size="webIcon.pageSize"
                layout="prev, pager, next" 
                :total="webIcon.totalPage"
                @current-change="handleCurrentChange"> </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
 
            
            
        </div>

    </div>
</template>

<script> 
    export default {
        data: function(){
            return {
                keyword: '',
                activeName: 'first',
                iconList:[],
                iconPageList:[],
                //web图标
                webIcon:{
                    //页面数量
                    pageSize:12,
                    //当前页
                    pageNo:0,
                    //总数量 
                    totalPage:0
                }
            }
        },
        methods:{
            selectIcon(val){
                debugger
                let iconValue="fa fa-"+val;
                this.$emit("received",iconValue);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
           
            handleCurrentChange(val) {
                var data=require('../../data/fontAwesome/webIcon.json');
                 this.iconList=data.iconList;  
                 this.iconPageList=this.iconList.slice((val-1)*this.webIcon.pageSize+(val-1),(val-1)*this.webIcon.pageSize+(val-1)+this.webIcon.pageSize);
            }
        },
        mounted(){
           var data=require('../../data/fontAwesome/webIcon.json');
           this.webIcon.pageSize=12;
           this.webIcon.pageNo=0;
           this.iconList=data.iconList;
           this.webIcon.totalPage=data.iconList.length;
          
           this.iconPageList=data.iconList.slice(this.webIcon.pageNo,this.webIcon.pageNo+this.webIcon.pageSize);
        },
        computed: {
            list(){
                return this.iconList.filter((item) => {
                    return item.indexOf(this.keyword) !== -1;
                })
            }
        }
    }
</script>

<style scoped>
.example-p{
    height: 45px;
    display: flex;
    align-items: center;
}
.search-box{
    text-align: center;
    margin-top: 10px;
}
.search{
    width: 300px;
}
ul,li{
    list-style: none;
}
.icon-li{
    display: inline-block;
    padding: 10px;
    width: 120px;
    height: 120px;
}
.icon-li-content{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-li-content i{
    font-size: 36px;
    color: #606266;
}
.icon-li-content span{
    margin-top: 10px;
    color: #787878;
}
</style>