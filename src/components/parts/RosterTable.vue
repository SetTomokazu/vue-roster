<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日" width="50"> </el-table-column>
    <el-table-column prop="day" label="曜日" width="50" :formatter="getWeek">
    </el-table-column>
    <el-table-column prop="start" label="出社時間" width="120">
    </el-table-column>
    <el-table-column prop="state" label="退社時間" width="120">
    </el-table-column>
    <el-table-column prop="workingHours" label="実作業時間" width="120">
    </el-table-column>
    <el-table-column prop="overtimeHours" label="残業時間" width="300">
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RosterRecord from "@/components/lib/RosterRecord";
import DateUtils from "../lib/DateUtils";

@Component
export default class RosterTable extends Vue {
  private tableData: RosterRecord[] = [];
  public getWeek(row: RosterRecord, column: string) {
    return DateUtils.getWeek(row.day);
  }
  public selectTartgetMonth(target: Date) {
    this.tableData = DateUtils.getDaysOfMonth(target).map(
      t => new RosterRecord(t)
    );
  }
}
</script>
