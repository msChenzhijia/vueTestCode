<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 角色列表
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
                <el-button type="primary" icon="el-icon-search" @click="showAddModel">添加角色</el-button>
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
                <el-table-column  align="center" prop="name" label="角色名称" ></el-table-column>
                <el-table-column  align="center" prop="userName" label="添加者"></el-table-column>  
                <el-table-column  align="center" prop="createTime" label="创建时间" :formatter="changeFormatter"></el-table-column>
                <el-table-column  align="center" prop="remark" label="备注" ></el-table-column>  
                <el-table-column  label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >权限</el-button>
                         <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
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

        <!-- 修改弹出框 -->
        <el-dialog title="角色添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveInsert">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改弹出框 -->
        <el-dialog title="角色编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.address"></el-input>
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
import { getRoleInfo,insertRoleInfo } from '../../../api/Role/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            addVisible:false,
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
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
        showAddModel(){
            this.addVisible=true
        },
       
        //转换相对应的中文标识
        changeTypeFormatter(val){
             if(val.type==2){
                 return "登陆记录";
             }else if(val.type===3){
                 return "微信记录";
             }  
        },
        // 获取 easy-mock 的模拟数据
        getData(){
            getRoleInfo({pageNo:this.query.pageIndex,pageSize:this.query.pageSize}).then(res => {
                console.log(res);
                 this.tableData = res.data;
                 this.pageTotal = res.pageTotal;
                 
            });
        },
        // 触发搜索按钮
        handleSearch(){
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
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
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
            this.editVisible = true;
        },
        // 新增
        saveInsert() {
            this.addVisible = false; 
            insertRoleInfo(this.form).then(a=>{
                if(a.code===0){
                     this.$message.success("添加成功");
                     this.getData();
                }else{
                    this.$message.success("添加失败");
                }
            })
        },
          // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
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
</style>
