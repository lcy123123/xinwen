<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column width="700" label="标题" prop='title'></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop='comment_status'></el-table-column>
      <el-table-column label="总评论数" prop='total_comment_count'></el-table-column>
      <el-table-column label="粉丝评论数" prop='fans_comment_count'></el-table-column>
      <el-table-column label="操作">
        <!-- 作用域插槽 slot-scope="变量" 变量  就是 row,column,$index.store的属性集合 obj.row -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改评论</el-button>
          <el-button
            @click="openOrClose(obj.row)"
            size="small"
            :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF'}"
            type="text"
          >{{obj.row.comment_status ? '关闭评论' : '打开评论'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style='margin:10px 0'>
      <!-- 分页组件  current-page当前页码 每页显示多少条 page-size total 总数 -->
      <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize"
                     :total="page.total" background layout="prev, pager, next"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: [
        {
          title: '',
          comment_status: '',
          total_comment_count: '',
          fans_comment_count: ''
        }
      ],
      page: {
        page: 1, // 当前页码
        pageSize: 4, // 当前每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论?`, '提示').then(() => {
        // 写调用接口
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() }, // 传递articleId参数
          data: { allow_comment: !row.comment_status } // 取反 因为当前如果是true  只能改成false , 如果是false 改成true
        }).then(result => {
          this.getComments() // 成功之后 重新调用 拉取数据的方法 => 前后台同步
        })
      })
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getComments()
    },
    getComments () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.page, per_page: this.page.pageSize }
      }).then(result => {
        this.loading = false // 响应数据之后关系
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style scoped>

</style>
