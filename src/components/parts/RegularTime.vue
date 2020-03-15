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
import { Component, Vue, Watch } from "vue-property-decorator";
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import { RegularTimeModule } from "@/store/modules/RegularTimeModule";

@Component
export default class RegularTime extends Vue {
  private regularTime: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];
  @Watch("RegularTimeStore.Range")
  private update(store: Date[]) {
    this.regularTime = store;
  }

  private mounted() {
    this.regularTime = RegularTimeModule.Range;
  }
  private change(event: Date[]) {
    RegularTimeModule.update(event);
  }
}
</script>

<style scoped>
.RegularTime {
  width: 100%;
}
</style>
