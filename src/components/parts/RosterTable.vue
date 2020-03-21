<template>
  <div class="RosterTable">
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
        prop="attendanceTime"
        label="出社時間"
        width="120"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-time-picker
            v-model="scope.row.attendanceTime"
            arrow-control
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:00'
            }"
            format="HH:mm"
            placeholder=""
            @change="updateStartTime(scope.$index, scope.row.attendanceTime)"
          >
          </el-time-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="leavingTime"
        label="退社時間"
        width="120"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-time-picker
            v-model="scope.row.leavingTime"
            arrow-control
            :picker-options="{
              selectableRange: '00:00:00 - 23:59:00'
            }"
            format="HH:mm"
            placeholder=""
            @change="updateEndTime(scope.$index, scope.row.leavingTime)"
          >
          </el-time-picker>
        </template>
      </el-table-column>
      <el-table-column
        prop="start"
        label="作業開始時間"
        width="120"
        header-align="center"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="end"
        label="作業終了時間"
        width="120"
        header-align="center"
        :formatter="dateFormatter"
      >
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import RosterRecord from "@/components/lib/RosterRecord";
import DateUtils from "../lib/DateUtils";
import { TableColumn } from "element-ui/types/table-column";
import { RosterRecordListModule } from "@/store/modules/RosterRecordListModule";
import moment from "moment";

@Component({})
export default class RosterTable extends Vue {
  private tableData: RosterRecord[] = [];
  public getWeek(row: RosterRecord, column: string) {
    return DateUtils.getWeek(row.day);
  }

  private mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "init") {
        this.tableData = RosterRecordListModule.list;
      }
    });
  }

  @Watch("RosterRecordListModule.list")
  private onChangeRosterRecordListModule(
    newList: RosterRecord[],
    oldList: RosterRecord[]
  ) {
    this.tableData = RosterRecordListModule.list;
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

  public updateStartTime(index: number, value: Date | null) {
    RosterRecordListModule.updateStartAt({ index, value });
  }
  public updateEndTime(index: number, value: Date) {
    RosterRecordListModule.updateEndAt({ index, value });
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
  public dateFormatter(
    row: RosterRecord,
    column: TableColumn,
    cellValue: Date | null,
    index: number
  ): string {
    return cellValue === null ? "" : moment(cellValue).format("HH:mm");
  }
}
</script>

<style scoped>
.RosterTable >>> .el-table .saturday-row {
  background: turquoise;
}
.RosterTable >>> .el-table .sunday-row {
  background: tomato;
}
.RosterTable >>> .el-table .holiday-row {
  background: tomato;
}
.RosterTable >>> .el-date-editor.el-input {
  width: 100%;
}
.RosterTable >>> .el-table td,
.RosterTable >>> .el-table th {
  padding: 1px;
}
</style>
