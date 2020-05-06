<template>
  <div class="app-container">

    <!-- 按钮栏 -->
    <div class="toolbar-container">
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleAddTopic">添加</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :data="topics"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="150">
        <template slot-scope="scope">
          {{ scope.row.topicId }}
        </template>
      </el-table-column>
      <el-table-column label="专题名称">
        <template slot-scope="scope">
          {{ scope.row.topicName }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleEditTopic(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDeleteTopic(row)">
            永久删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- /表格 -->

    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.offset" :limit.sync="listQuery.limit"
                @pagination="fetchTopicsData"/>
    <!-- /分页 -->

    <!-- 编辑框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
        <el-form-item label="专题名称" prop="topicName">
          <el-input v-model="temp.topicName"/>
        </el-form-item>
        <el-form-item label="排序" prop="orderId">
          <el-input v-model="temp.orderId"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSaveTopic()">
          保存
        </el-button>
      </div>
    </el-dialog>
    <!--/编辑框-->
  </div>
</template>

<script>
  import { addTopic, deleteTopic, listAllTopics, updateTopic } from '@/api/quotations/topic'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'Topic',
    components: { Pagination },
    data() {
      return {
        total: 0,
        listQuery: {
          offset: 1,
          limit: 25
        },
        topics: [],
        temp: {
          topicId: undefined,
          topicName: '',
          orderId: 0
        },
        dialogMode: 'ADD',
        dialogTitle: '',
        dialogFormVisible: false,
        rules: {
          topicName: [{ required: true, message: '专题名称必填', trigger: 'change' }]
        }
      }
    },
    created() {
      this.fetchTopicsData()
    },
    methods: {
      fetchTopicsData() {
        listAllTopics(this.listQuery).then(response => {
          this.topics = response.data
          this.total = response.total
        })
      },
      /**
       * 显示添加框
       */
      showAddDialog() {
        this.dialogMode = 'ADD'
        this.dialogTitle = '新增'
        this.temp = {
          topicId: undefined,
          topicName: '',
          orderId: 0
        }
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      showEditDialog() {
        this.dialogMode = 'EDIT'
        this.dialogTitle = '修改'
        this.dialogFormVisible = true
      },
      handleAddTopic() {
        this.showAddDialog()
      },
      /* 修改专题 */
      handleEditTopic(row) {
        // 填充值
        this.temp = Object.assign({}, row)
        this.showEditDialog()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      /* 删除专题 */
      handleDeleteTopic(row) {
        deleteTopic(row.topicId).then(() => {
          this.$notify({
            title: '提示',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      /* 保存专题 */
      handleSaveTopic() {

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // 新增专题
            if (this.dialogMode == 'ADD') {
              addTopic(this.temp).then(() => {
                this.dialogFormVisible = false
                this.$notify({
                  title: '提示',
                  message: '新增成功',
                  type: 'success',
                  duration: 2000
                })
              })
            } else if (this.dialogMode == 'EDIT') {
              // 编辑专题
              const tempData = Object.assign({}, this.temp)
              updateTopic(tempData).then(() => {
                let index = this.topics.findIndex(v => v.topicId === this.temp.topicId)
                this.topics.splice(index, 1, this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: '提示',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          }
        })

      }
    }
  }
</script>

<style scoped lang="scss">
  .toolbar-container {
    padding: 10px;
  }
</style>
