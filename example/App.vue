<template>
  <div id="app">
    <div class="sidebar">
      <router-link class="sidebar-item" to="/performance">高性能</router-link>
      <router-link class="sidebar-item" to="/operate">各类操作</router-link>
      <router-link class="sidebar-item" to="/fixed">固定高度</router-link>
      <router-link class="sidebar-item" to="/slot">4个插槽</router-link>
      <router-link class="sidebar-item" to="/horizontal">水平滚动</router-link>
      <router-link class="sidebar-item" to="/table">表格</router-link>
      <router-link class="sidebar-item" to="/editable"
        >可编辑单元格</router-link
      >
      <!-- <router-link class="sidebar-item" to="/infinity">无限加载</router-link>
      <router-link class="sidebar-item" to="/chat">聊天室</router-link> -->
      <!-- <router-link class="sidebar-item" to="/pagination">分页-触底</router-link> -->
      <!-- <router-link class="sidebar-item" to="/tree">树形</router-link> -->
      <!-- <router-link to="/pagination-pre">分页-提前</router-link> -->
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overscroll-behavior: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;

  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .sidebar {
    width: 100px;
    min-width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    background-color: #fff;

    .sidebar-item {
      width: 100%;
      height: 30px;
      font-weight: bold;
      color: #2c3e50;
      display: flex;
      align-items: center;
      padding: 0 10px;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .container {
    flex: 1;
    padding: 20px;

    .button-group {
      display: flex;
      padding: 10px 0;

      button + button {
        margin-left: 20px;
      }

      input {
        width: 60px;
      }
    }
  }
}
</style>
