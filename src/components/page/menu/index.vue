<template>
<div>
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 菜单列表
                </el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <div class="containert">
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
              <el-table
               row-key="id"
                :data="tableData"   
                :stripe="true"
                :border="true"
                :highlight-current-row="true"                
                @expand-change="handleExpendRow"
                style="width: 100%">
                 <el-table-column type="expand">
                  <template scope="scope">
                   <el-table 
                        :data="tableData[scope.$index].row"
                        style="width: 100%"
                        :stripe="true"
                        :border="true"
                          
                        :row-class-name="tableRowClassName">
                        <el-table-column prop="path" label="路径" width="180"></el-table-column>
                        <el-table-column prop="component" label="组件信息" width="180"></el-table-column>
                        <el-table-column prop="title" label="标题"></el-table-column>
                        <el-table-column prop="icon" label="图标"></el-table-column> 
                        <el-table-column prop="createTime" width="150" :formatter="changeFormatter" label="创建时间"></el-table-column> 
                        <el-table-column  label="操作" width="300" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-lx-add" @click="handleShow(scope.$index, scope.row)">查看</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>                            
                        </template>
                </el-table-column>
                    </el-table> 
                  </template>
                </el-table-column>
                <el-table-column label="模块名称" prop="name"> </el-table-column>
                <el-table-column label="创建时间" prop="createTime" :formatter="changeFormatter"> </el-table-column>
                <el-table-column label="创建人" prop="userName"></el-table-column>
                <el-table-column label="图标" prop="icon"></el-table-column> 
                <el-table-column label="状态" prop="status" :formatter="changeStatusFormatter" ></el-table-column>
                <el-table-column label="备注"prop="remark"></el-table-column> 
                <el-table-column  label="操作" width="380" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-lx-add" @click="handleShow(scope.$index, scope.row)">查看</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleAdd(scope.$index, scope.row)">添加子集</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

            <!--图标模块-->
            <el-dialog
            title="图标模块"
                :visible.sync="iconModel"
                width="50%"
                :before-close="handleClose3">
              <!-- <iconComponent @received="getIconValue"></iconComponent> -->
              <iconComponent @received="getMenuIconValue"></iconComponent>
            </el-dialog>

            <!--图标模块-->
            <el-dialog
            title="图标模块"
                :visible.sync="iconModel"
                width="50%"
                :before-close="handleClose3">
                <iconComponent @received="getIconValue"></iconComponent>
              <!-- <iconComponent @received="getMenuIconValue"></iconComponent> -->
            </el-dialog>

            <!--添加菜单模块-->
            <el-dialog
                title="添加菜单模块"
                :visible.sync="insertModel"
                width="30%"
                :before-close="handleClose3">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="模块名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="是否有效" prop="status">
                   <el-switch
                      @change="changeStatus"
                      v-model="status"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                 <el-form-item label="图标" prop="icon">
                     <el-input  v-model="form.icon" disabled="">
                      <template slot="append"><el-button @click="showIcon">icon </el-button></template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="form.sort"    :min="1" :max="10" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertModel = false">取 消</el-button>
                <el-button type="primary" @click="moduleSubmit(form)">确 定</el-button>
            </span>
            </el-dialog>


             <!--修改菜单模块-->
            <el-dialog
                title="修改菜单模块"
                :visible.sync="updateModel"
                width="30%"
                :before-close="handleClose3">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="模块名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item> 
                 <el-form-item label="模块名称" prop="id" v-show="false">
                    <el-input v-model="form.id"></el-input>
                </el-form-item> 
                <el-form-item label="是否有效" prop="status">
                   <el-switch
                      @change="changeStatus"
                      v-model="status"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                 <el-form-item label="图标" prop="icon">
                     <el-input  v-model="form.icon" disabled="">
                      <template slot="append"><el-button @click="showIcon">icon </el-button></template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="form.sort"   :min="1" :max="100" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertModel = false">取 消</el-button>
                <el-button type="primary" @click="moduleSubmit(form)">确 定</el-button>
            </span>
            </el-dialog>

            <!--添加子集信息 -->
            <el-dialog
                title="菜单模块"
                :visible.sync="insertMenuInfo"
                width="50%"
                :before-close="handleClose3">
                <el-form ref="menuForm" :rules="menuRules" :model="menuForm" label-width="80px">
                <el-form-item label="菜单标题" prop="title">
                    <el-input v-model="menuForm.title"></el-input>
                </el-form-item> 
                
                <el-form-item label="菜单路径" prop="path">
                    <el-input v-model="menuForm.path"></el-input>
                </el-form-item> 
                
                <input type="hidden" v-model="menuForm.moduleInfoId"/> 
               
                 <el-form-item label="菜单组件" prop="component">
                    <el-input v-model="menuForm.component"></el-input>
                </el-form-item> 
                <el-form-item label="图标" prop="icon">
                     <el-input  v-model="menuForm.icon" disabled="">
                      <template slot="append"><el-button @click="showIcon">icon </el-button></template>
                    </el-input>
                </el-form-item>
                 <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="menuForm.sort"   :min="1" :max="100" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item> 
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="insertModel = false">取 消</el-button>
                <el-button type="primary" @click="menuSubmit(menuForm)">确 定</el-button>
            </span>
            </el-dialog>

            <!--查看模块信息--> 
            <el-dialog
                title="菜单模块信息"
                :visible.sync="showModel"
                width="30%"
                 :before-close="handleClose3">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="模块名称" prop="name">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="是否有效" prop="status" >
                   <el-switch
                      disabled
                      @change="changeStatus"
                      v-model="status"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="图标" prop="icon">
                     <el-input  v-model="form.icon" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="form.sort" :disabled="true"  :min="1" :max="10" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" disabled></el-input>
                </el-form-item> 
            </el-form> 
            </el-dialog>
    </div>
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
import {getList,insert,update,delete1,getMenuInfoList} from '../../../api/Menu/index'
import iconComponent from  '../../common/Icon'
import {moduleGetList,moduleInsert,moduleUpdate,moduleDelete} from '../../../api/Module/index'
  export default {
    data() {
      return {
        form:{},
        menuForm:{},
        status:false,
        query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
        pageTotal:0,
        insertMenuInfo:false,
        menuForm:{},
        updateModel:false,
        iconModel:false,
        insertModel:false,
        showModel:false,
        tableData: [],
        rules:{
          name:[
              { required: true, message: '请输入模块名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          icon:[
              { required: true, message: '请选择图标', trigger: 'blur' },
            
          ],
          status:[
              { required: true, message: '请选择状态', trigger: 'blur' },
            
          ],
          sort:[
              { required: true, message: '请输入序号', trigger: 'blur' },
          ]
        },
        menuRules:{
          title:[
              { required: true, message: '请输入标题', trigger: 'blur' },
          ],
           path:[
              { required: true, message: '请输入路径', trigger: 'blur' },
          ],
          component:[
             { required: true, message: '请输入组件信息', trigger: 'blur' },
          ],
           icon:[
              { required: true, message: '请选择图标', trigger: 'blur' },
            
          ],
          sort:[
              { required: true, message: '请输入序号', trigger: 'blur' },
          ]
        },
      }
    },
    created(){
       this.getListData();
    },
    components:{
      iconComponent
    },
    methods:{ 
      
      //获取父级table展示的事件
      handleExpendRow(row, expandedRows){ 
         if(expandedRows.length>0){
          let that=this; 
          getMenuInfoList({id:row.id}).then(a=>{  
              that.tableData.forEach((temp,index)=>{
                if (temp.id === row.id) {
                  that.tableData[index].row=a.data;   
                }
              })
          });
         } 
      },
      //获取数据
      getListData(){
        const rLoading = this.openLoading();
        moduleGetList({pageNo:this.query.pageIndex,pageSize:this.query.pageSize}).then(c=>{
          if(c.code===0){
            rLoading.close();
            //this.tableData.length=0;
             c.data.map(item=>{
               item.row=[];
             }) 
           
            this.tableData=c.data; 
            this.pageTotal=c.pageTotal;           
          }else{
             this.$message.error('查询失败'); 
          }
          
       })
      },
      //打开修改模态框
      handleEdit(index,row){
           this.form=row;
           this.updateModel=true;
      },
      //查询模块
      handleShow(index,row){ 
        this.form=row;
        this.showModel=true;
      },
      //分页导航
      handlePageChange(val) {
          this.$set(this.query, 'pageIndex', val);
          this.getListData();
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
      //将状态值转中文
      changeStatusFormatter(val){
        if(val.status===0){
          return "有效";
        }else{
          return "无效";
        }
      },
      //新增的模块是否有效
      changeStatus(val){
        
        if(val===true){
          this.form.status=0;
        }else{
          this.form.status=-1;
        }
      },
      //获取图标
      getIconValue(val){
        console.log("测试"); 
        console.log(val);
        this.form.icon=val;
        this.iconModel=false;
      },
      //获取图标
      getMenuIconValue(val){
          console.log("测1"); 
        this.menuForm.icon=val;
        this.iconModel=false;
      },
      //添加子类型
      handleAdd(index,row){
        this.menuForm.moduleInfoId=row.id;
        console.log(this.menuForm.moduleInfoId)
        this.insertMenuInfo=true;
      },
      //删除
      handleDelete(index,row){
        let taht=this;
         this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          moduleDelete({id:row.id}).then(a=>{
            if(a.code===0){
              this.$message.success('删除成功'); 
              taht.getListData();
            }else{
              this.$message.success('删除失败'); 
              return ;
            }
          })
        }).catch(() => { 
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      //显示图标模态框
      showIcon(){
        this.iconModel=true;
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },    
      handleClose(done) {
        this.form={};
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
       },
      handleClose2(done) {
        this.form={};
         done();
       },
      handleClose3(done) {        
         done();
       },
        //系统类型模态框
      insertSystem(){
            this.insertModel=true;
       },
          // 触发搜索按钮
      handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getListData();
       },
      //模块提交
      moduleSubmit(valid){ 
          let that=this;
          this.$refs.form.validate((valid) => {
            if(valid){
                  const rLoading = this.openLoading();
                  moduleInsert({icon:this.form.icon,name:this.form.name,status:this.form.status,remark:this.form.remark}).then(a=>{
                    if(a.code===0){
                      rLoading.close();
                      this.$message.success('添加成功'); 
                      this.insertModel=false;
                      this.form={};
                      that.getListData();
                    }else{
                      this.$message.success('添加失败'); 
                    }
                  })
            }else{
              return false;   
            }
          });
          
        },
        //菜单提交
        menuSubmit(valid){ 
          let that=this;
          this.$refs.menuForm.validate((valid) => {
            if(valid){
               const rLoading = this.openLoading();
                  insert(
                    {
                      path:this.menuForm.path,
                      component:this.menuForm.component,
                      title:this.menuForm.title,
                      icon:this.menuForm.icon,
                      sort:this.menuForm.sort,
                      moduleInfoId:this.menuForm.moduleInfoId}).then(a=>{
                    if(a.code===0){
                      rLoading.close();
                      this.$message.success('添加成功'); 
                      this.insertMenuInfo=false;
                      this.menuForm={};
                      that.getListData();
                    }else{
                      this.$message.success('添加失败'); 
                    }
                  })
            }else{
              return false;   
            }
          });
          
        }
    }
  }
</script>