<template>
    <div>
         <el-tabs :tab-position="tabPosition" style="height: 500px;">
                    <el-tab-pane label="个人信息">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="头像">  
                            <UploadImage></UploadImage>
                        </el-form-item>
                    <el-form-item label="真实姓名">
                        <el-input v-model="form.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="系统用户名">
                         <el-input v-model="form.userName"></el-input>
                    </el-form-item> 
                    <el-form-item label="性别"> 
                            <el-radio v-model="form.sex"  :label="0">男</el-radio>
                            <el-radio v-model="form.sex"  :label="1">女</el-radio> 
                    </el-form-item>
                    <el-form-item label="电话">
                          <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                           <el-input v-model="form.address"></el-input>
                    </el-form-item> 
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button> 
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="报表设置">配置管理</el-tab-pane>
            <el-tab-pane label="修改密码">
                <el-form   :model="formInline" class="demo-form-inline">
                    <el-form-item label="老密码">
                        <el-input placeholder="请输入老密码" v-model="resetForm.old" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input placeholder="请输入新密码" v-model="resetForm.new" show-password></el-input> 
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onResetSubmit">确认</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane> 
        </el-tabs>
    </div>
</template>
<script>
import UploadImage  from '../common/UploadImage';
import {getUserInfo,update,resetPass} from '../../api/User/index'
  export default {
    data() {
      return {
        form: {
          userName: '',
          createTime: '',
          status: '',
          realName: '',
          sex: false,
          headPortrait: [],
          remark: '',
          phone: '',
          address: ''
        },
        resetForm:{
            old:'',
            new:''
        },
        formInline:{
            user:'',
            region:''
        },
        tabPosition: 'left'
      };
    },
    components:{
        UploadImage
    },
    mounted(){
        getUserInfo().then(a=>{
            this.form=a.data;
        });
    },
    methods:{
        //密码重置按钮
      onResetSubmit(){
          const rLoading = this.openLoading();
          resetPass({oldPass:this.resetForm.old,newPass:this.resetForm.new}).then(a=>{
               rLoading.close();
              if(a.code===0){
                    this.$message.success('密码重置成功');
              }else{
                    this.$message.error(a.msg);
              }
          })
      },
      onSubmit() { 
           this.$confirm('确定修改信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            update(form).then(a=>{
                    
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  };
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>