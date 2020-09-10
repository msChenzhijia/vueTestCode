<template>
    <div>
        <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-lx-cascades"></i> 菜单列表
                    </el-breadcrumb-item>
                </el-breadcrumb>
        </div> 
        <div class="containert" style="height:100%">
             <el-form :inline="true" ref="form"  class="demo-form-inline">
                <el-form-item label="日期">
                    <el-date-picker 
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker> 
                </el-form-item> 
                <el-form-item label="关键字">
                      <el-input v-model="query.name" placeholder="请输入关键字(模糊查询)" class="handle-input mr10"></el-input>
                </el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="insertSystem">添加</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
             </el-form>  
               <el-row style="height:100%">
                 <el-col :span="4" style="height:100%" >
                    <el-menu
                        default-active="2"
                        :unique-opened="true"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        style="height:100%">

                        <el-submenu :index="i+''" v-for="(item,i) in moduleList"> 
                            <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        </el-menu>
                 </el-col>
                  <el-col :span="20">
                    <el-table  :stripe="true" :border="true" :data="tableData" style="width: 100%">
                        <el-table-column  align="center"  prop="title" label="名称"></el-table-column>
                        <el-table-column  align="center"  prop="path" label="页面路径"></el-table-column>
                        <el-table-column  align="center"  prop="icon" label="图标"></el-table-column>
                        <el-table-column  align="center"  prop="component" label="组件"></el-table-column>
                        <el-table-column  align="center"  prop="sort" label="排序"></el-table-column>
                        <el-table-column  align="center"  prop="adminId" label="创建人"></el-table-column>
                        <el-table-column  align="center"  prop="createTime"label="创建时间"></el-table-column>
                        <el-table-column  align="center"  prop="status" label="状态"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                          <el-button @click="handleMenuUpdate(scope.row)" type="text" size="small">修改</el-button>
                          <el-button @click="handleMenuDelete(scope.row)" type="text" size="small">删除</el-button> 
                        </template>
                      </el-table-column>
                   </el-table>
                    <el-pagination layout="prev, pager, next"  :total="childTotal"></el-pagination>
                  </el-col>
               </el-row>  
               <!--菜单操作模态框 -->
               <MenuOperation :titleValue="menuModelInfo.title" :widthValue="menuModelInfo.width" :dialogVisible="menuModelInfo.isShow"></MenuOperation>
        </div>
    </div>
</template>
<script>
import {getList,insert,update,delete1,getMenuInfoList} from '../../../api/Menu/index'
import {moduleGetList,moduleInsert,moduleUpdate,moduleDelete} from '../../../api/Module/index'
import MenuOperation from '../../common/MenuDialog/Operation'
  export default {
    components:{
      MenuOperation:MenuOperation
    },
    data() {
      return {
        menuModelInfo:{
            isShow:false,
            title:"",
            width:"30%"
        },
          query:{
              pageNo:0,
              pageSize:10
          }, 
          queryChild:{
            pageNo:0,
            pageSize:10
          },
          childTotal:0,
          tableData:[],
          moduleList:[]   
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      insertSystem(){

      },
      handleSearch(){

      },
      handleClose(){

      },
      //菜单更新事件
      handleMenuUpdate(index){
        console.log(index);

        this.menuModelInfo.isShow=true;
        this.menuModelInfo.title="菜单信息修改-"+index.name;
        this.menuModelInfo.width="30%"

      },
      //菜单删除事件
      handleMenuDelete(index){
        console.log(index);
      },
      handleOpen(){

      },
      //获取模块
      getModuleList(){
        moduleGetList({pageNo:this.query.pageNo,pageSize:this.query.pageSize}).then(a=>{
              if(a.code==0){
                  this.moduleList=a.data; 
                  let index=a.data[0].id;
                   
                  getMenuInfoList({pageNo:this.queryChild.pageNo,pageSize:this.queryChild.pageSize,id:index}).then(c=>{
                    if(c.code===0){
                      this.tableData=c.data;
                      console.log(c.pageTotal);
                      this.childTotal=c.pageTotal;
                    }
                  })
              }else{

              }
        });
      }
    },
    created(){
        this.getModuleList();
    }
  };
</script>
<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>

