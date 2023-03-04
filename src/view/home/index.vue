<template>
  <div class="home">
    home
    <div @click="changeTheme">切换</div>
    <div @click="go">go</div>
  </div>
</template>
<script>
import { changeThemes } from '../../untils/changeTheme.js' 
export default {
  name: 'home',
  data () {
    return {
    }
  },
  mounted () {
    console.log('xxx')
  },
  methods: {
    changeTheme() {
      let mode = localStorage.getItem('mode') || 'red'
      if (mode === 'red') {
        changeThemes('green')
        mode = 'green'
      } else {
        changeThemes('red')
        mode = 'red'
      }
     
    },

    go() {
      this.$router.push('/my')
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  color: var(--text_color);
  background-color: var(--bg_color);
}
</style>