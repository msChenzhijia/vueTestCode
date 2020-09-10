<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统设置
                </el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <div class="containert">
        <el-form :inline="true"   class="demo-form-inline">
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
              <el-table
                :data="tableData"
                 @expand-change="handleExpendRow"
                style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">    
                     <el-table
                        :data="tableData[props.$index].row"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="key"
                          label="名称"
                          width="100">
                        </el-table-column>
                        <el-table-column
                          prop="value"
                          label="值"
                          width="180">
                        </el-table-column>
                         <el-table-column
                          prop="status"
                          label="状态" width="200"> 
                          <template slot-scope="scope">
                              <el-switch
                                style="display: block;"
                                v-model="tableData[props.$index].row[scope.$index].status==0?false:true"
                                @change="changeSysSettingStatus(tableData[props.$index].row[scope.$index])"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="启用"
                                inactive-text="禁用">
                              </el-switch>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="createTime"
                          label="创建时间" :formatter="changeFormatter" width="150">
                        </el-table-column> 
                       
                         <el-table-column
                          prop="userName"
                          label="创建人">
                        </el-table-column>
                          <el-table-column
                          prop="remark"
                          label="备注">
                        </el-table-column>
                         <el-table-column label="操作" width="200">
                        <template slot-scope="scope">  
                            <el-button type="text" icon="el-icon-delete" @click="handleSysSettingDelete(scope.$index, scope.row,props.$index)">删除</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="handleSysSettingEdit(scope.$index, scope.row,props.$index)">修改</el-button>                    
                          </template>
                </el-table-column>
                      </el-table>
                </template>
                </el-table-column>
                <el-table-column
                label="系统类型"
                prop="name">
                </el-table-column>
                <el-table-column
                label="创建时间"
                prop="createTime" :formatter="changeFormatter">
                </el-table-column>
                  <el-table-column
                label="创建人"
                prop="userName">
                </el-table-column>
                
                <el-table-column
                label="是否有效"
                prop="identifying">
                   <template slot-scope="scope">
                              <el-switch
                                style="display: block;"
                                v-model="tableData[scope.$index].identifying==0?false:true"
                                @change="changeStatus(tableData[scope.$index])"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-text="启用"                                
                                inactive-text="禁用">
                              </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                label="备注"
                prop="remark">
                </el-table-column>
                <el-table-column label="操作" width="300">
                   <template slot-scope="scope">   
                      <el-button type="text" icon="el-icon-lx-add"  @click="handleAddChild(scope.$index, scope.row)">添加子集</el-button>  
                      <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>       
                      <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>         
                    </template>
                </el-table-column>
            </el-table> 
             <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            <!--添加父级信息-->
            <el-dialog
                title="添加系统信息"
                :visible.sync="insertModel"
                width="30%"
                :before-close="handleClose">
                <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="分类名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="是否有效">
                      <el-switch
                        v-model="form.identifying"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="100"
                        inactive-value="0">
                      </el-switch>
                      
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item> 
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="insertModel = false">取 消</el-button>
                    <el-button type="primary" @click="insertSystemType('form')">确 定</el-button>
                </span>
            </el-dialog>
            <!--添加子级信息-->
             <el-dialog
                title="添加子信息"
                :visible.sync="insertChildModel"
                width="30%"
              >
                <el-form :model="childForm" :rules="childRules" ref="childForm"  label-width="80px">
                    <el-form-item label="键" prop="key">
                        <el-input v-model="childForm.key"></el-input>
                    </el-form-item> 
                    <el-form-item label="值" prop="value">
                        <el-input v-model="childForm.value"></el-input>
                    </el-form-item> 
                      <el-form-item label="是否启用" prop="status">
                        <el-switch
                          v-model="childForm.status"
                          active-text="启用"
                          inactive-text="不启用">
                        </el-switch>
                    </el-form-item>  
                    <el-form-item label="备注">
                        <el-input v-model="childForm.remark"></el-input>
                    </el-form-item> 
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="insertModel = false">取 消</el-button>
                    <el-button type="primary" @click="insertSysSetting('childForm')">确 定</el-button>
                </span>
            </el-dialog>

    </div>
    <!-- 父级删除提示框 -->
   
</div>
 
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
import {
insert
,getList
,sysSettingGetList
,sysSettingInsert
,sysSettingUpdate
,sysSettingDelete
,sysSettingUpdateStatus
,sysSettingTypeUpdateStatus
,delete1
}from '../../../api/system/index' 
  export default {
    data() {
      return {
        form:{},
        query: { 
          pageIndex: 1,
          pageSize: 10
        },
        childForm:{
          status:true
        },
        pageTotal:0,
        insertModel:false,
        insertChildModel:false,
        tableData: [],
        rules:{
          name:[
              { required: true, message: '类别名称', trigger: 'blur' }
          ],
          identifying:[
             { required: true, message: '请选择状态', trigger: 'blur' }
          ]
        },
        childRules:{
          key:[
              { required: true, message: '类别名称', trigger: 'blur' }
          ],
          value:[
             { required: true, message: '请选择状态', trigger: 'blur' }
          ],
          status:[
             { required: true, message: '请选择状态', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{ 
      changeSysSettingStatus(val){
        debugger
         let taht=this;
         this.$confirm('此操作有可能会影响系统的正常, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let status=true;
          if(val.status===0){
            val.status=true;
            status=true;
          }else{
            val.status==false;
            status=false;
          }
          sysSettingUpdateStatus({id:val.id,status:status}).then(a=>{
              if(a.code===0){
                  this.$message.success('修改成功'); 
              }else{
                   this.$message.error('修改失败'); 
              }
           })
        }).catch(() => { 
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
        
      },
       changeStatus(val){
         debugger
         let taht=this;
         this.$confirm('此操作有可能会影响系统的正常, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let status=1;
          if(val.identifying===0){
            val.identifying=true;
            status=1;
          }else{
            val.identifying==false;
            status=0;
          }
          sysSettingTypeUpdateStatus({id:val.id,status:status}).then(a=>{
              if(a.code===0){
                  this.$message.success('修改成功'); 
              }else{
                   this.$message.error('修改失败'); 
              }
           })
        }).catch(() => { 
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
        
      },
       //分页导航
      handlePageChange(val) {
          this.$set(this.query, 'pageIndex', val);
          this.getListData();
      },
      //父级删除
      handleDelete(index,row){
          this.$confirm('此操作有可能会影响系统的正常, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            delete1({id:row.id}).then(a=>{
                  if(a.code===0){
                  this.$message.success('删除成功'); 
                  this.tableData.splice(index,1);
            }else{
                  this.$message.error('删除失败'); 
            }
          })
        }).catch(() => { 
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
         
      },
      //父级修改
      handleEdit(index,row){

      },
      handleConfirm(){
        delete1()
      },
      handleCancel(){
        
      },
       //时间戳转日期
      changeFormatter(val){  
         var now=new Date(val.createTime); 
         var year=now.getFullYear();  //取得4位数的年份
         var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
         var date=now.getDate();      //返回日期月份中的天数（1到31）
         var hour=now.getHours();     //返回日期中的小时数（0到23）
         var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
         var second=now.getSeconds(); //返回日期中的秒数（0到59）
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;  
      },
      //添加子集
      handleAddChild(index,row){
        this.childForm.pid=row.id;
        this.insertChildModel=true;
      },
       //时间戳转日期
      changeUpdateTimeFormatter(val){  
        if(val.updateTime===""||val.updateTime===null){
          return null;
        }
         var now=new Date(val.updateTime); 
         var year=now.getFullYear();  //取得4位数的年份
         var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
         var date=now.getDate();      //返回日期月份中的天数（1到31）
         var hour=now.getHours();     //返回日期中的小时数（0到23）
         var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
         var second=now.getSeconds(); //返回日期中的秒数（0到59）
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;  
      },
        //系统类型模态框
      insertSystem(){
            this.insertModel=true;
      },
      //弹窗关闭
      handleClose(done) {
          let that=this;
          this.$confirm('确认关闭？')
          .then(_ => {
            that.form={};
            done();
          })
          .catch(_ => {});
      },
      //查询数据
      getData(){ 
          const rLoading = this.openLoading("正在加载...");
          let that=this;
            getList({pageNo:this.query.pageIndex,pageSize:this.query.pageSize}).then(a=>{
              rLoading.close();
              if(a.code===0){
                a.data.map(item=>{
                  item.row=[];
                })
                  that.tableData=a.data;
                  that.pageTotal=a.pageTotal; 
                  console.log(that.tableData) 
              }else{
                   this.$message.error('查询失败'); 
              }
            })
      },
      // 触发搜索按钮
      handleSearch(){
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
      },
      //添加系统类别
      insertSystemType(form){         
          this.$refs[form].validate((valid) => {
          if (valid) {
              const rLoading = this.openLoading("正在添加..");
             insert({name:this.form.name,remark:this.form.remark}).then(a=>{
                 rLoading.close();
                if(a.code===0){                    
                    this.$message.success('添加成功'); 
                    this.insertModel=false;
                    this.getData();
                    getData();
                }else{
                    this.$message.success('添加失败');   
                }
             });
          } else { 
            return false;
          }
      });
      },
       //添加系统子信息
      insertSysSetting(childForm){
           let that=this; 
          this.$refs[childForm].validate((valid) => {
              if(valid){ 
                 const rLoading = this.openLoading();
                sysSettingInsert(
                  {
                    key:this.childForm.key,
                    value:this.childForm.value,
                    pid:this.childForm.pid,
                    status:this.childForm.status,
                    remark:this.childForm.remark
                    }
                  ).then(a=>{
                     rLoading.close();
                  if(a.code===0){
                    this.$message.success('添加成功'); 
                    this.insertChildModel=false;
                    sysSettingGetList({pid:row.id}).then(a=>{
                    rLoading.close();
                    that.tableData.forEach((temp,index)=>{
                    if(temp.id===row.id){
                        that.tableData[index].row=a.object;   
                    }
                  })
             })
                          this.insertChildModel=false;
                    }else{
                          this.$message.success('添加失败:'+a.message); 
                    }
                });
              }else{
                return false;
              }
          }); 
      },
      //获取下拉数据
      handleExpendRow(row, expandedRows){ 
        if(expandedRows.length>0){
             let that=this; 
             const rLoading = this.openLoading("正在加载....");
             sysSettingGetList({id:row.id}).then(a=>{
                 rLoading.close();
               that.tableData.forEach((temp,index)=>{
                 if(temp.id===row.id){
                    that.tableData[index].row=a.data;   
                 }
               })
             })
        }
      },
      //系统设置删除
      handleSysSettingDelete(index,row,pIndex){
         this.$confirm('此操作有可能会影响系统的正常, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            sysSettingDelete({id:row.id}).then(a=>{
                  if(a.code===0){
                  this.$message.success('删除成功'); 
                  this.tableData[pIndex].row.splice(index,1);
            }else{
                  this.$message.error('删除失败'); 
            }
          })
        }).catch(() => { 
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      //系统设置更新
      handleSysSettingEdit(index,row,pIndex){
        this.$confirm('此操作有可能会影响系统的正常, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            sysSettingUpdate({id:row.id}).then(a=>{
                  if(a.code===0){
                  this.$message.success('修改成功'); 
                  this.tableData[pIndex].row.splice(index,1);
            }else{
                  this.$message.error('修改失败'); 
            }
          })
        }).catch(() => { 
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
    },
       
    created(){
      this.getData();
    }
  }
</script>