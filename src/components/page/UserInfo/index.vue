<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>人员列表
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
                <el-button type="primary" icon="el-icon-lx-add" @click="addVisibleShow">添加人员</el-button>
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
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.headPortrait"
                            :preview-src-list="[scope.row.headPortrait]"
                        ></el-image>
                    </template>
                </el-table-column> 
                <el-table-column
                    label="状态" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            :active-value="0"
                            :inactive-value="1"
                            active-color="#02538C"
                            inactive-color="#B9B9B9"
                            @change="changeSwitch(scope.row.status)"/>
                    </template> 
                </el-table-column>
                <el-table-column  align="center" prop="userName" label="用户名称"></el-table-column> 
                <el-table-column  align="center" prop="realName" label="真实姓名"   ></el-table-column>  
                <el-table-column  align="center" prop="sex" label="性别" :formatter="changeSexFormatter" ></el-table-column> 
                <el-table-column  align="center" prop="phone" label="电话号码"  ></el-table-column>
                <el-table-column  align="center" prop="address" label="地址"  ></el-table-column>
                <el-table-column  align="center" prop="remark" label="备注"  ></el-table-column>
                <el-table-column  label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >查看</el-button>
                       
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
        <el-dialog title="添加人员" :visible.sync="addVisible" width="70%">
            <el-form ref="form" :model="form" label-width="120px">
                 <el-form-item label="头像"> 
                    <UploadImage></UploadImage> 
                </el-form-item>
                <el-form-item label="管理员名称">
                    <el-input v-model="form.userName" ></el-input>
                </el-form-item>
                <el-form-item label="管理员真实名称">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                 <el-form-item label="性别">
                     <el-radio v-model="form.sex" label="0">男</el-radio>
                     <el-radio v-model="form.sex" label="1">女</el-radio>
                </el-form-item>
                 <el-form-item label="电话号码">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
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
import { getList } from '../../../api/User/index';
import UploadImage from '../../common/UploadImage'
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
    components:{
        UploadImage
    },
    created() {
        this.getData();
    },
    methods: {
        changeSwitch(val){
             // 二次确认删除
            this.$confirm('确定要修改？将会影响该用户之后的操作', '提示', {
                type: 'warning'
            }).then(() => {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
            }).catch(() => {
                 this.$message.success('删除失败');
            });
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
        //展示添加model
        addVisibleShow(){
            this.addVisible=true;
        },
        //转换相对应的中文标识
        changeSexFormatter(val){
             if(val.status==0){
                 return "男";
             }else {
                 return "女";
             }  
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            getList({pageNo:this.query.pageIndex,pageSize:this.query.pageSize}).then(res => {
                  
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
