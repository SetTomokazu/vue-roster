<template>
  <el-table
    :data="tableData"
    height="600"
    :row-class-name="tableRowClassName"
    border
    show-summary
  >
    <el-table-column prop="date" label="日" width="50"> </el-table-column>
    <el-table-column prop="day" label="曜日" width="50" :formatter="getWeek">
    </el-table-column>
    <el-table-column prop="start" label="勤務時間" width="230">
      <template slot-scope="scope">
        <el-time-picker
          v-model="scope.row.start"
          arrow-control
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:00'
          }"
          placeholder="Arbitrary time"
          @change="scope.row.calcHours"
        >
        </el-time-picker>
      </template>
    </el-table-column>
    <el-table-column prop="end" label="退社時間" width="230">
      <template slot-scope="scope">
        <el-time-picker
          v-model="scope.row.end"
          arrow-control
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:00'
          }"
          placeholder="Arbitrary time"
        >
        </el-time-picker>
      </template>
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

  public tableRowClassName(obj: { row: RosterRecord; rowIndex: number }) {
    if (obj.row.day === 0) {
      return "sunday-row";
    } else if (obj.row.day === 6) {
      return "saturday-row";
    } else if (obj.row.isHoliday) {
      return "holiday-row";
    } else {
      return "";
    }
  }
}
</script>

<style>
.el-table .saturday-row {
  background: turquoise;
}

.el-table .sunday-row {
  background: tomato;
}
.el-table .holiday-row {
  background: tomato;
}
</style>
