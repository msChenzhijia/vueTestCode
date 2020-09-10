<template> 
 <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>微信管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">  
              <el-tabs :tab-position="tabPosition" >
                <el-tab-pane label="公众号消息回复"> 
                  <div style="margin-bottom:20px">
                       <el-button type="primary" @click="dialogVisible=true">添加</el-button>
                  </div>
                   
                   <el-collapse accordion>
                    <el-collapse-item>
                        <template slot="title">文字回复</template>
                         <el-row style="margin-bottom:20px"> 
                          <el-col :span="4" v-for="(o, index) in textArray" :key="o.id" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '0px' }">
                               <div slot="header" class="clearfix">  
                                <el-switch v-model="o.status" active-color="#13ce66"  inactive-color="#ff4949" @change="changeStatus(o)"></el-switch>
                              </div> 
                            <div style="padding: 14px;">
                                <span>{{o.textValue}}</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ changeFormatter(o.createTime) }}</time> 
                                   
                                    <el-button type="text" class="button" @click="deleteWeChatReply('text',o.id,index)">删除</el-button>
                                    <el-button type="text" class="button">修改</el-button>
                                </div>
                            </div>
                            </el-card>
                        </el-col> 
                       </el-row>
                    </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">图片回复</template>
                         <el-row style="margin-bottom:20px"> 
                          <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '0px' }">
                                    <el-image
                                    style="width:100px; height: 100px;margin-left:25%;padding:10px"
                                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                    ></el-image> 
                                    <div style="padding: 14px;">
                                    
                                    <div class="bottom clearfix">
                                        <time class="time">{{ currentDate }}</time> 
                                        <el-button type="text" class="button">操作按钮</el-button>
                                    </div>
                            </div>
                            </el-card>
                        </el-col> 
                       </el-row>
                    </el-collapse-item>
                     <el-collapse-item>
                        <template slot="title">图文回复</template>
                         <el-row style="margin-bottom:20px"> 
                          <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '0px' }"> 
                            <div style="padding: 14px;">
                                <span>谢谢</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time> 
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div>
                            </div>
                            </el-card>
                        </el-col> 
                       </el-row>
                    </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">视频回复</template>
                         <el-row style="margin-bottom:20px"> 
                          <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '0px' }"> 
                            <div style="padding: 14px;">
                                <span>谢谢</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time> 
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div>
                            </div>
                            </el-card>
                        </el-col> 
                       </el-row>
                    </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">音乐回复</template>
                         <el-row style="margin-bottom:20px"> 
                          <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '0px' }"> 
                            <div style="padding: 14px;">
                                <span>谢谢</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time> 
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div>
                            </div>
                            </el-card>
                        </el-col> 
                       </el-row>
                    </el-collapse-item>
                      <el-collapse-item>
                        <template slot="title">语音回复</template>
                         <el-row style="margin-bottom:20px"> 
                          <el-col :span="4" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                            <el-card :body-style="{ padding: '0px' }"> 
                            <div style="padding: 14px;">
                                <span>谢谢</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time> 
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div>
                            </div>
                            </el-card>
                        </el-col> 
                       </el-row>
                    </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="微信素材">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </div>
        <!--添加微信信息 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
         >
          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="信息类型">
               <el-select v-model="value" placeholder="请选择" @change="change">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"   
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文字" v-show="isText">
                    <el-input v-model="form.textValue"></el-input>
              </el-form-item>
              <el-form-item label="多媒体" > 
                 <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="weChatSubmit">确 定</el-button>
          </span>
        </el-dialog>
 </div>
</template>
<script> 
import{getList,update,updateStatus,delete1,insert} from '../../../api/WeChat/index' 
  export default {
    data() {
      return { 
        imageUrl: '', 
        dialogVisible:false,
        value:true,
        isText:false,
        isVideo:false,
        form:{},
        textArray:[],
        videoArray:[],
        newsArray:[],
        voiceArray:[],
        musicArray:[],
        imageArray:[],
        options: [{
          value: 'text',
          label: '文本'
        },{
          value: 'video',
          label: '视频'
        },{
          value: 'image',
          label: '图片'
        },{
          value: 'voice',
          label: '语音'
        },{
          value: 'music',
          label: '音乐'
        },{
          value: 'news',
          label: '图文'
        }],
        value:'',
        tabPosition: 'left',
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        currentDate: "2020/8/5"
      };
    },
   created(){
        this.getData();
   },
   methods:{
    deleteWeChatReply(val,val1,index){ 
       this.$confirm('确定要删除？有可能会影响正在运行的公众号', '提示', {
                type: 'warning'
            })
            .then(() => { 
              const rLoading = this.openLoading("正在删除....");
             
                delete1({id:val1}).then(a=>{
                     rLoading.close();
                    if(a.code===0){
                      if (val==="text"){
                        this.textArray.splice(index,1);
                      }else  if (val==="image"){

                      }
                        this.$message.success('删除成功'); 
                    }else{
                        this.$message.success('删除失败');
                    }
                    
                })
                
            })
            .catch(() => {}); 
    },
     changeStatus(val){ 
            this.$confirm('确定要修改？会影响正在运行的公众号,且只能开启一个', '提示', {
                type: 'warning'
            })
            .then(() => {
                if(val.status===true){
                    this.form.status=true;
                }else{
                    this.form.status=false;
                }
                const rLoading = this.openLoading("正在加载....");
              let statusValue=this.form.status==true?1:0;
                updateStatus({id:val.id,status:statusValue}).then(a=>{
                     rLoading.close();
                    if(a.code===0){
                        this.$message.success('修改成功'); 
                    }else{
                        this.$message.success('修改失败');
                    }
                    
                })
                
            })
            .catch(() => {}); 
         
     },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      change(val){
        if (val==="text"){
            this.isText=true;
        }else if (val==="video"){
            this.isText=false;
        }else if (val==="image"){
            this.isVideo=true;
            this.isText=false;
        }else if (val==="voice"){

        }else if (val==="image"){

        }else if (val==="voice"){

        }
          this.form.type=val;
      },
      //时间戳转日期
        changeFormatter(val){  
            var now=new Date(val); 
            var year=now.getFullYear();  //取得4位数的年份
            var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date=now.getDate();      //返回日期月份中的天数（1到31）
            var hour=now.getHours();     //返回日期中的小时数（0到23）
            var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
            var second=now.getSeconds(); //返回日期中的秒数（0到59）
            return year+"-"+month+"-"+date;  
        },
      getData(){
        let that=this;
        const rLoading = this.openLoading("正在加载....");
        getList().then(a=>{
            that.textArray=[];
            that.voiceArray=[]; 
            that.imageArray=[];
            that.videoArray=[]; 
            that.musicArray=[];
            rLoading.close();
            a.object.forEach((index) => {
               index.status=index.status==0?false:true;
              if(index.type==="text"){ 
                that.textArray.push(index);
              }else if(index.type==="voice"){
                that.voiceArray.push(index);
              }else if(index.type==="image"){
                that.imageArray.push(index);
              }else if(index.type==="video"){
                that.videoArray.push(index);
              }else if(index.type==="music"){
                that.musicArray.push(index);
              }else{
                that.newsArray.push(index);
              }
            });
        })
      },
      weChatSubmit(){
        insert({type:this.form.type,textValue:this.form.textValue}).then(a=>{
          if(a.code===0){
               this.getData();
               this.dialogVisible=false;
               this.$message.success('添加成功');
          }else{
               this.$message.error('删除失败');
          }
        })
      }
   }
  };
</script>

<style scoped>
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>