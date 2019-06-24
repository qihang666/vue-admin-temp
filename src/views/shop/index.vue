<template>
  <div class="app-container" >
    <div class="search">
          <el-input style="width: 200px;"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="sname">
      </el-input>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          新增
        </el-button>
    </div>


    <div class="table">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商铺名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="region"
              label="地区"
              width="120">
            </el-table-column>
            <el-table-column
              prop="location"
              label="位置"
              width="120">
            </el-table-column>
            <el-table-column
              prop="linkman"
              label="联系人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              width="100">
            </el-table-column>
            
            <el-table-column
              prop="updateDate"
              label="更新时间"
              width="180">
            </el-table-column>
                     <el-table-column
              prop="createDate"
              label="创建时间"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
            <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
   </div>

   <el-dialog  :visible.sync="dialogFormVisible"    width="30%">
      <el-form ref="dataForm"  :model="temp" label-position="right" label-width="70px" >
        
        <el-form-item label="名 字">
            <el-input  v-model="temp.name"> </el-input>
       </el-form-item>
        <el-form-item label="地 区">
            <el-input  v-model="temp.region">  </el-input>
         </el-form-item>
         <el-form-item label="位置">
            <el-input  v-model="temp.location" > </el-input>
         </el-form-item>
         <el-form-item label="联系人">
            <el-input  v-model="temp.linkman"> </el-input>
         </el-form-item>
         <el-form-item label="电 话">
            <el-input  v-model="temp.phone"> </el-input>
         </el-form-item>
          <el-form-item>
            <el-button @click="dialogFormVisible = false">
              取消
            </el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
              确定
            </el-button>
          </el-form-item>

      </el-form>
    </el-dialog>


    <el-dialog    title="提示"    :visible.sync="removeDialogVisible"    width="20%" center >
      <span>{{tips}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeData">确 定</el-button>
      </span>
</el-dialog>
    
  </div>

</template>


<script>
import { mapGetters } from 'vuex'
import { getList,add,update,remove } from '@/api/shop'
export default {

  name:'shop',
  data(){
     return {
          sname:"",
          tableData: [],
          dialogFormVisible:false,
          removeDialogVisible:false,
          dialogStatus:'create',
          tips:'',
          temp:{
            name:'',
            region: '',
            location: '',
            linkman: '',
            phone: '',
          
          },
     }
  },
  created() {
    this.getDataList()
  },
  methods:{
    resetTemp(){
       this.temp = {
            name:'',
            region: '',
            location: '',
            linkman: '',
            phone: '',
       }
    },
    getDataList(){

      getList({}).then(response => {
          console.log(response)
           const { data } = response
           this.tableData = data
               console.log(data)
              //  this.tableData.push(data)
      }).catch(error => {
          console.log(error)
      })


    },
    handleCreate(){
      this.dialogFormVisible =!this.dialogFormVisible
      console.log("s")
       this.dialogStatus='create'
    },
    handleEdit(i,d){
      console.log(i,d)
      const tempData = Object.assign({}, d)
      console.log(tempData)
      this.temp = tempData
      this.dialogFormVisible= true
      this.dialogStatus='update'
    },
    handleDelete(i,d){
      console.log(i,d)
      this.removeDialogVisible =true
      this.tips ='删除id ='+d.id+' 的数据么？'
      this.temp = Object.assign({}, d)


    },
    createData(){
         const tempData = Object.assign({}, this.temp)
       add(tempData).then(response => {
          console.log(response)
               const { data } = response
               this.resetTemp()
               this.tableData.push(data)
               this.dialogFormVisible= false
                this.$notify({
                  title: 'Success',
                  message: '新增成功',
                  type: 'success',
                  duration: 2000
              })
      }).catch(error => {
          console.log(error)
      })
    },
    updateData(){
      // console.log("createData")
         const tempData = Object.assign({}, this.temp)
          // console.log(tempData)
          update(tempData).then(response => {
                  this.getDataList()
                  this.resetTemp()
                  this.dialogFormVisible= false
                  this.$notify({
                      title: 'Success',
                      message: '更新成功',
                      type: 'success',
                      duration: 2000
                  })
          }).catch(error => {
              console.log(error)
          })
    },
    removeData(){
      // console.log("createData")
        const tempData = Object.assign({}, this.temp)
        remove({id:tempData.id}).then(response => {
              this.getDataList()
              this.resetTemp()
              this.removeDialogVisible= false
              this.$notify({
                  title: 'Success',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
        }).catch(error => {
            console.log(error)
        })
    },
  }
}
</script>

<style  scoped>
.app-container{
  margin: 10PX;

}
.search{
  padding-bottom: 10px;
}

</style>
