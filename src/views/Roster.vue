<template>
  <div class="roster">
    <roster-table ref="table"></roster-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RosterTable from "@/components/parts/RosterTable.vue";

@Component({ components: { RosterTable } })
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
