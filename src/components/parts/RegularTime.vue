<template>
  <el-time-picker
    v-model="regularTime"
    arrow-control
    is-range
    class="RegularTime"
    range-separator="To"
    :picker-options="{
      selectableRange: '00:00:00 - 23:59:00'
    }"
    format="HH:mm"
    start-placeholder="Start time"
    end-placeholder="End time"
    @change="change"
  >
  </el-time-picker>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import { RegularTimeStore } from "@/store";

@Component
export default class RegularTime extends Vue {
  private regularTime: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];

  private mounted() {
    this.regularTime = RegularTimeStore.range;
  }
  private change(event: Date[]) {
    RegularTimeStore.updateStartTime(event[0]);
    RegularTimeStore.updateEndTime(event[1]);
  }
}
</script>

<style scoped>
.RegularTime {
  width: 100%;
}
</style>
