<template>
  <el-container>
    <el-header>勤務時間</el-header>
    <el-row>
      <el-col :span="8">
        氏名
      </el-col>
      <el-col :span="16">
        <el-input placeholder="姓名" v-model="input"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        勤務時間
      </el-col>
      <el-col :span="16">
        <regular-time />
      </el-col>
    </el-row>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegularTime from "./RegularTime.vue";

@Component({ components: { RegularTime } })
export default class RegularTimeContainer extends Vue {
  private input = "";
  private regularTime: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];
}
</script>

<style></style>
