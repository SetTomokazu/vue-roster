<template>
  <div class="roster">
    <time-setting ref="setting"></time-setting>
    <roster-table ref="table"></roster-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegularTime from "@/components/parts/RegularTime.vue";
import RosterTable from "@/components/parts/RosterTable.vue";
import TimeSetting from "@/components/parts/TimeSetting.vue";
import { RosterRecordListModule } from "../store/modules/RosterRecordListModule";

@Component({ components: { RosterTable, RegularTime, TimeSetting } })
export default class Roster extends Vue {
  private targetMonth: Date = new Date();
  private workRecord: [] = [];
  private get refs(): any {
    return this.$refs;
  }

  private get target() {
    return this.targetMonth !== null ? this.targetMonth : new Date();
  }

  private mounted() {
    RosterRecordListModule.init(new Date());
    // this.refs.table.selectTartgetMonth(new Date());
  }
}
</script>
