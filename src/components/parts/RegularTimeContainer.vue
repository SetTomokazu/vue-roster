<template>
  <el-container>
    <el-header>勤務時間</el-header>
    <el-main>
      <regular-time />
      <regular-time />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegularTime from "./RegularTime.vue";

@Component({ components: { RegularTime } })
export default class RegularTimeContainer extends Vue {
  private regularTime: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];
}
</script>

<style></style>
