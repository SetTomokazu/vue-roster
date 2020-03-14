<template>
  <el-container>
    <el-header>休憩時間</el-header>
    <el-row>
      <el-col :span="12">
        <break-time />
      </el-col>
      <el-col :span="12">
        <break-time />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <break-time />
      </el-col>
      <el-col :span="12">
        <break-time />
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreakTime from "./BreakTime.vue";

@Component({ components: { BreakTime } })
export default class BreakTimeContainer extends Vue {
  private regularTime: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
