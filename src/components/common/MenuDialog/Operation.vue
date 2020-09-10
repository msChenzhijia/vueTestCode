<template>
    <el-dialog
    :title="titleValue"
    :visible.sync="dialogVisible"
    :width="widthValue"
    :before-close="handleClose">
   <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="菜单名称">
        <el-input v-model="form.title"></el-input>
    </el-form-item> 
     
    <el-form-item label="是否启用">
        <el-radio-group v-model="form.status">
        <el-radio label="0">启动</el-radio>
        <el-radio label="1">未启用</el-radio>
        </el-radio-group>
    </el-form-item>

    <el-form-item label="菜单路径">
        <el-input v-model="form.path"></el-input>
    </el-form-item> 

    <el-form-item label="菜单组件">
        <el-input v-model="form.component"></el-input>
    </el-form-item> 

    <el-form-item label="菜单图标">
         <el-input-number v-model="form.sort"  :min="1" label="菜单序号"></el-input-number>
    </el-form-item> 
   
    
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{btn}}</el-button>
    </span>
    </el-dialog>
</template>
<script>
import{insert,update}from '../../../api/Menu/index'
  export default {
    props:{
        titleValue:String,
        visible:Boolean,
        widthValue:String,
        dialogVisible:{
            type:Boolean,
            default:false
        }, 
        //1添加,2修改
        Operation:{
            type:Number,
            default:1
        }
    },
    created(){
      this.btn= this.Operation==1?"立即添加":"立即修改"
    },
    data() {
      return { 
            btn:"",
            form:{
                path:'',
                component:'',
                title:'',
                icon:'',
                sort:'',  
                moduleInfoId:0,
                status:0,
                id:0
            },
      };
    },
    methods: {
      handleOperation(){
        const rLoading = this.openLoading();
        if (this.Operation==1){
            insert(
                {
                    path:this.form.path,
                    component:this.form.component,
                    title:this.form.title,
                    icon:this.form.icon,
                    sort:this.form.sort,
                    moduleInfoId:this.form.moduleInfoId,
                    status:this.form.status
                }
            ).then(c=>{ 
                if(c.code===0){
                     this.$message.success('添加成功'); 
                }else{
                    this.$message.error('添加失败');      
                }
                rLoading.close();
            })            
        }else{
            update({
                    id:this.form.id,
                    path:this.form.path,
                    component:this.form.component,
                    title:this.form.title,
                    icon:this.form.icon,
                    sort:this.form.sort,
                    moduleInfoId:this.form.moduleInfoId,
                    status:this.form.status
                }).then(a=>{
                    if(a.code===0){
                         this.$message.success('修改成功'); 
                    }else{
                         this.$message.error('修改失败');      
                    }
                     rLoading.close();
                })
        }
      },
      //关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>