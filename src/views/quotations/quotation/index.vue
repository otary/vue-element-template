<template>
  <div class="app-container">
    <!-- 按钮栏 -->
    <div class="toolbar-container">
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleAddQuotation">添加</el-button>
    </div>

    <!-- 表格 -->
    <el-table
      :data="quotations"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="150">
        <template slot-scope="scope">
          {{ scope.row.qid }}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="喜欢">
        <template slot-scope="scope">
          {{ scope.row.likesCount }}
        </template>
      </el-table-column>
      <el-table-column label="收藏">
        <template slot-scope="scope">
          {{ scope.row.collectCount }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column label="作者">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleEditQuotation(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDeleteQuotation(row)">
            永久删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- /表格 -->

    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.offset" :limit.sync="listQuery.limit"
                @pagination="fetchQuotationsData"/>
    <!-- /分页 -->

    <!-- 编辑框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 12}" v-model="temp.content"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="temp.state"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleSaveQuotation()">
          保存
        </el-button>
      </div>
    </el-dialog>
    <!--/编辑框-->
  </div>
</template>

<script>

  import { addQuotation, deleteQuotation, listAllQuotations, updateQuotation } from '@/api/quotations/quotation'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'Quotation',
    components: { Pagination },
    data() {
      return {
        total: 0,
        dialogMode: 'ADD',
        dialogTitle: '',
        dialogFormVisible: false,
        temp: {
          qid: undefined,
          content: '',
          state: ''
        },
        quotations: [],
        listQuery: {
          offset: 1,
          limit: 25
        },
        rules: {
          content: [{ required: true, message: '内容必填', trigger: 'change' }],
          state: [{ required: true, message: '状态必填', trigger: 'change' }]
        }
      }
    },
    created() {
      this.fetchQuotationsData()
    },
    methods: {
      fetchQuotationsData() {
        listAllQuotations(this.listQuery).then(response => {
          this.quotations = response.data
          this.total = response.total
        })
      },
      showAddDialog() {
        this.dialogMode = 'ADD'
        this.dialogTitle = '新增'
        this.temp = {
          qid: undefined,
          content: '',
          state: ''
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
      /* 添加语录 */
      handleAddQuotation() {
        this.showAddDialog()
      },
      /* 修改语录 */
      handleEditQuotation(row) {
        this.temp = Object.assign({}, row)
        this.showEditDialog()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      /* 删除语录 */
      handleDeleteQuotation(row) {
        deleteQuotation(row.topicId).then(() => {
          this.$notify({
            title: '提示',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      /* 保存语录 */
      handleSaveQuotation() {

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // 新增语录
            if (this.dialogMode == 'ADD') {
              addQuotation(this.temp).then(() => {
                this.dialogFormVisible = false
                this.$notify({
                  title: '提示',
                  message: '新增成功',
                  type: 'success',
                  duration: 2000
                })
              })
            } else if (this.dialogMode == 'EDIT') {
              // 编辑语录
              const tempData = Object.assign({}, this.temp)
              updateQuotation(tempData).then(() => {
                let index = this.quotations.findIndex(v => v.topicId === this.temp.topicId)
                this.quotations.splice(index, 1, this.temp)
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
    padding: 15px;
  }
</style>
