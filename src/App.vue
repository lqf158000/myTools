<template>
  <div id="app">
    <el-container>
      <el-aside style="width: 100px; height: 100vh">
        <side-bar />
      </el-aside>
      <el-main style="margin-left: 20px">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import sideBar from "./components/sideBar.vue";

@Component({
  components: {
    sideBar,
  },
})
export default class Home extends Vue {}
</script>

<style>
#app {
  height: 100vh;
}
</style>
