<template>
  <div class="roster">
    <regular-time ref="regular"></regular-time>
    <roster-table ref="table"></roster-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegularTime from "@/components/parts/RegularTime.vue";
import RosterTable from "@/components/parts/RosterTable.vue";

@Component({ components: { RosterTable, RegularTime } })
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
    this.refs.table.selectTartgetMonth(new Date());
  }
}
</script>
