<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 消息中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary" @click="allRead">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="deleteAll()">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="emptyRestore">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
  import { getMessageList,adminMessageInsert,updateAdminMessage,deleteAdminMessage,getAdminMessage } from '../../../api/systemMessage/index';
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                unread: [],
                read: [],
                recycle: []
            }
        },
        methods: {
            //全部已读
            allRead(){ 
              let dis="";
              let array=[];
              for(let i=0;i<this.unread.length;i++){
                 dis+=this.unread[i].id+","; 
                 array.push(this.unread[i]);
              }
              for(let j=0;j<array.length;j++){ 
                 const item = this.unread.splice(array.length-j-1, 1);  
                 this.read = item.concat(this.read);
              }
              array=[]; 
              dis=dis.substring(0,dis.length-1);
              adminMessageInsert({model:dis}).then(a=>{
                if(a.code===0){
                    this.$message.success('移除成功');
                }else{
                    this.$message.success('移除失败');
                }
             })
            },
            //已读按钮
            handleRead(index) { 
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
                let array=[];
                let obj={}; 
                array.push(item[0].id);
                
                adminMessageInsert({model:item[0].id}).then(a=>{
                    if(a.code===0){
                    this.$message.success('移除成功');
                    }else{
                        this.$message.success('移除失败');
                    }
                })
            },
            //删除按钮
            handleDel(index){ 
                const item = this.read.splice(index, 1); 
                updateAdminMessage({model:item[0].id,type:1}).then(a=>{
                    if(a.code===0){
                        this.$message.success('移除成功');
                    }else{
                        this.$message.success('移除失败');
                    }
                })
                this.recycle = item.concat(this.recycle);
            },
            //还原按钮
            handleRestore(index) {

                const item = this.recycle.splice(index, 1);
                updateAdminMessage({model:item[0].id,type:1}).then(a=>{
                    if(a.code===0){
                        this.$message.success('移除成功');
                    }else{
                        this.$message.success('移除失败');
                    }
                });
                this.read = item.concat(this.read);
            },
            //删除全部
            deleteAll(){
                let ids="";
                let array=[];
                for(let i=0;i<this.read.length;i++){
                    ids+=this.read[i].id+",";
                     array.push(this.read[i]);
                } 
                for(let j=0;j<array.length;j++){ 
                 const item = this.read.splice(array.length-j-1, 1);  
                 this.recycle = item.concat(this.recycle);
                }
                array=[]; 
                ids=ids.substring(0,ids.length-1); 
                updateAdminMessage({model:ids,type:1}).then(a=>{
                    if(a.code===0){
                        this.$message.success('移除成功');
                    }else{
                        this.$message.success('移除失败');
                    }
                }); 
            },
            //清空回收站
            emptyRestore(){
                let ids="";
                let array=[];
                for(let i=0;i<this.recycle.length;i++){
                    ids+=this.recycle[i].id+",";
                     array.push(this.recycle[i]);
                } 
                for(let j=0;j<array.length;j++){ 
                 const item = this.recycle.splice(array.length-j-1, 1);  
                } 
                ids=ids.substring(0,ids.length-1); 
                updateAdminMessage({model:ids,type:2}).then(a=>{
                    if(a.code===0){
                        this.$message.success('移除成功');
                    }else{
                        this.$message.success('移除失败');
                    }
                }); 
            }
        },
        mounted(){
          getAdminMessage({pageNo:0,pageSize:10,status:0}).then(a=>{
            if(a.code===0){
                this.unread=a.data.unread;
                this.read=a.data.readed==null?[]:a.data.readed;
                this.recycle=a.data.recycleBin==null?[]:a.data.recycleBin;
            }
            console.log(a)
          })  
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

