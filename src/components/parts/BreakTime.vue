<template>
  <el-time-picker
    v-model="regularTime"
    arrow-control
    is-range
    range-separator="To"
    :picker-options="{
      selectableRange: '00:00:00 - 23:59:00'
    }"
    format="HH:mm"
    start-placeholder="Start time"
    end-placeholder="End time"
  >
  </el-time-picker>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BreakTime extends Vue {
  private regularTime: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];
}
</script>

<style></style>
