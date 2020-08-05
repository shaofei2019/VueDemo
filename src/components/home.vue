<template>
  <div>
      <a v-on:click.prevent="logout">sdfsdfsd</a>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
        this.$message({
            showClose: true,
            message: '已成功退出',
            type: 'success'
        })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
