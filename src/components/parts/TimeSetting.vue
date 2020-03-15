<template>
  <div class="TimeSetting">
    <el-container>
      <el-header>勤務表</el-header>
      <el-row>
        <el-col :span="12"><regular-time-container /></el-col>
        <el-col :span="12"><break-time-container /></el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegularTimeContainer from "./RegularTimeContainer.vue";
import BreakTimeContainer from "./BreakTimeContainer.vue";

@Component({ components: { RegularTimeContainer, BreakTimeContainer } })
export default class TimeSetting extends Vue {
  private regularTime: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];
}
</script>

<style scoped>
.TimeSetting >>> .el-header {
  background-color: #c6d1b3;
  color: #333;
  font-size: 150%;
  text-align: center;
}
</style>
