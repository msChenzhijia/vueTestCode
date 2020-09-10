<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 系统信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
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
                <el-button type="primary" icon="el-icon-search" @click="addVisibleChange">添加</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </el-form>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column  type="index" width="55" align="center"></el-table-column> 
                <el-table-column  align="center" prop="type" label="标题" :formatter="changeTypeFormatter" ></el-table-column>
                <el-table-column  align="center" prop="requestUrl" label="创建人"></el-table-column>
                <el-table-column  align="center" prop="content" label="重要级别" :formatter="changeTypeFormatter" ></el-table-column>  
                <el-table-column  align="center" prop="createTime" label="创建时间" :formatter="changeFormatter"></el-table-column>
                <el-table-column  label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >更新</el-button>

                         <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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
        </div>

      

        <!-- 添加弹出框 -->
        <el-dialog title="消息详情" 
        :visible.sync="addVisible" 
        width="70%" 
        v-dialogDrag
        :center="true"
        :close-on-click-modal="false" >
            <el-form ref="form" :model="form" :rules="rules" label-width="70px">
                <input type="hidden" v-model="form.id"/>
                <el-form-item label="消息标题">
                    <el-input v-model="form.title" ></el-input>
                </el-form-item>
                <el-form-item label="级别">
                    <el-select v-model="value" placeholder="请选择" @change="levelChange">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容">
                    <div class="container"> 
                         <quill-editor ref="myTextEditor" v-model="form.message" :options="editorOption"></quill-editor>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { getMessageList,insert,update,deleteMessage } from '../../../api/systemMessage/index';
  import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'basetable',
    data() {
        return {
            editorOption:{
                placeholder: 'Hello World'
            },
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            options:[{
                value:0,
                label:"普通"
            },{
                value:1,
                label:"重要"
            },{
                value:2,
                label:"紧急"
            }],
            value:"",
            addVisible:false,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            rules:{
                title:[
                    {required:true,message:"请输入消息标题",trigger:'blur'},

                ]
            }
        };
    },
     components: {
            quillEditor
        },
    created() {
        this.getData();
    },
    methods: {
        levelChange(val){
            this.form.level=val;
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
        //添加模态框
        addVisibleChange(){
            this.addVisible=true;
        },
        //转换相对应的中文标识
        changeTypeFormatter(val){
             if(val.level==0){
                 return "普通等级";
             }else if(val.level===2){
                 return "紧急等级";
             }else if(val.type===1){
                 return "重要等级";
             }    
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            getMessageList({pageNo:this.query.pageIndex,pageSize:this.query.pageSize}).then(res => {
                console.log(res);
                 this.tableData = res.data;
                 this.pageTotal = res.pageTotal;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                deleteMessage({id:row.id}).then(a=>{
                    if(a.code===0){
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    }else{
                        this.$message.success('删除失败');
                    }
                    
                })
                
            })
            .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row; 
            this.addVisible = true;
        },
        // 保存编辑
        saveEdit() {
            if(this.form.id!=0){
                insert({message:this.form.message,title:this.form.title,level:this.form.level}).then(a=>{
                  if(a.code===0){
                       this.$message.success('添加成功');
                       getMessageList().then(res => {
                            console.log(res);
                            this.tableData = res.object;
                            this.pageTotal = res.pageTotal;
                        });
                        this.addVisible=false;
                  }else{
                       this.$message.success('添加失败');
                       return;
                  }
                }) 
            }else{
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            }
         
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.editor-btn{
        margin-top: 20px;
    }
</style>
