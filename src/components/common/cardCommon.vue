<template>
    <div>
         <template slot="title">{{title}}</template>
            <el-row style="margin-bottom:20px"> 
              <el-col v-if="type==='text'"  :span="4" v-for="(o, index) in textArray" :key="o.id" :offset="index > 0 ? 2 : 0">
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
            <el-col v-else-if="type==='image'"  :span="4" v-for="(o, index) in imageArray" :key="o.id" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                   <div slot="header" class="clearfix">  
                    <el-switch v-model="o.status" active-color="#13ce66"  inactive-color="#ff4949" @change="changeStatus(o)"></el-switch>
                  </div> 
                 <el-image
                          style="width:100px; height: 100px;margin-left:25%;padding:10px"
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          ></el-image>     
                <div style="padding: 14px;">
                    <span>{{o.textValue}}</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ changeFormatter(o.createTime) }}</time> 
                       
                        <el-button type="text" class="button" @click="deleteWeChatReply('image',o.id,index)">删除</el-button>
                        <el-button type="text" class="button">修改</el-button>
                    </div>
                </div>
                </el-card>
            </el-col> 
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{ 
            textArray:[],
            videoArray:[],
            newsArray:[],
            voiceArray:[],
            musicArray:[],
            imageArray:[]
        }
        
    },
    props:['type','title'],
    created(){

    },
    methods:{
        
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
    }
}
</script>