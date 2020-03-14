<template>
  <el-table
    :data="tableData"
    height="600"
    :row-class-name="tableRowClassName"
    border
    show-summary
    :summary-method="getSummaries"
  >
    <el-table-column prop="date" label="日" width="50" header-align="center">
    </el-table-column>
    <el-table-column
      prop="day"
      label="曜日"
      width="50"
      :formatter="getWeek"
      header-align="center"
    >
    </el-table-column>
    <el-table-column
      prop="start"
      label="出社時間"
      width="245"
      header-align="center"
    >
      <template slot-scope="scope">
        <el-time-picker
          v-model="scope.row.start"
          arrow-control
          class="WorkTimePicker"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:00'
          }"
          format="HH:mm"
          placeholder="出勤時間"
          @change="scope.row.calcHours"
        >
        </el-time-picker>
      </template>
    </el-table-column>
    <el-table-column
      prop="end"
      label="退社時間"
      width="245"
      header-align="center"
    >
      <template slot-scope="scope">
        <el-time-picker
          v-model="scope.row.end"
          arrow-control
          class="WorkTimePicker"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:00'
          }"
          format="HH:mm"
          placeholder="退社時間"
          @change="scope.row.calcHours"
        >
        </el-time-picker>
      </template>
    </el-table-column>
    <el-table-column
      prop="workingHours"
      label="実作業時間"
      width="100"
      header-align="center"
      :formatter="numberFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="overtimeHours"
      label="残業時間"
      width="100"
      header-align="center"
      :formatter="numberFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="holidayWorkingHours"
      label="休出時間"
      width="100"
      header-align="center"
      :formatter="numberFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="holidayOvertimeHours"
      label="休出残業"
      width="100"
      header-align="center"
      :formatter="numberFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="overtimeHours"
      label="代休時間"
      width="100"
      header-align="center"
      :formatter="numberFormatter"
    >
    </el-table-column>
    <el-table-column
      prop="overtimeHours"
      label="遅刻・早退"
      width="100"
      header-align="center"
      :formatter="numberFormatter"
    >
    </el-table-column>
    <el-table-column prop="remarks" label="備考">
      <template slot-scope="scope">
        <el-input placeholder="備考" v-model="scope.row.remarks" clearable>
        </el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RosterRecord from "@/components/lib/RosterRecord";
import DateUtils from "../lib/DateUtils";
import { ElTableColumn, TableColumn } from "element-ui/types/table-column";
import { SummaryMethodParams } from "element-ui/types/table";

@Component({})
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
  getSummaries(params: {
    columns: TableColumn[];
    data: RosterRecord[];
  }): string[] {
    const sums: string[] = [];
    params.columns.forEach((column, index) => {
      if (0 <= index && index < 3) {
        sums[index] = "";
        return;
      }
      if (index === 3) {
        sums[index] = "合計";
        return;
      }
      if (index === 10) {
        sums[index] = "";
        return;
      }
      const values = params.data.map(item => {
        switch (column.property) {
          case "workingHours":
            return item.workingHours;
          case "overtimeHours":
            return item.overtimeHours;
          case "holidayWorkingHours":
            return item.holidayWorkingHours;
          case "holidayOvertimeHours":
            return item.holidayOvertimeHours;
          default:
            return item.workingHours;
        }
      });
      if (!values.every(value => isNaN(value))) {
        sums[index] = `${values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0)}`;
      } else {
        sums[index] = "";
      }
    });

    return sums;
  }
  public numberFormatter(
    row: RosterRecord,
    column: TableColumn,
    cellValue: number,
    index: number
  ): number {
    return Math.round(cellValue * 100) / 100;
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

.WorkTimePicker {
  width: 100%;
}
</style>
