<template>
  <div class="BreakTime">
    <el-time-picker
      v-model="breakTime"
      arrow-control
      is-range
      class="BreakTime"
      range-separator="To"
      :picker-options="{
        selectableRange: '00:00 - 23:59'
      }"
      format="HH:mm"
      start-placeholder="Start time"
      end-placeholder="End time"
      @change="change"
    >
    </el-time-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";

@Component({})
export default class BreakTime extends Vue {
  private breakTime: Date[] | null = null;

  public update(value: Date[] | null): void {
    this.breakTime = value;
  }

  @Emit("change")
  private change(value: Date[] | null) {
    return value;
  }
}
</script>

<style scoped>
.BreakTime >>> .BreakTime {
  width: 100%;
}
</style>
