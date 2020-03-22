<template>
  <div class="BreakTimeContainer">
    <el-container>
      <el-header>休憩時間</el-header>
      <el-row>
        <el-col :span="12">
          <break-time ref="breakTime1" @change="change1" />
        </el-col>
        <el-col :span="12">
          <break-time ref="breakTime2" @change="change2" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <break-time ref="breakTime3" @change="change3" />
        </el-col>
        <el-col :span="12">
          <break-time ref="breakTime4" @change="change4" />
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BreakTime from "./BreakTime.vue";
import { BreakTimeListModule } from "../../store/modules/BreakTimeListModule";

@Component({ components: { BreakTime } })
export default class BreakTimeContainer extends Vue {
  private get refs(): any {
    return this.$refs;
  }
  private mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "updateBreakTimeAt") {
        this.refresh();
      }
    });
    this.refresh();
  }
  private refresh() {
    this.refs.breakTime1.update(BreakTimeListModule.breakTimeList[0]);
    this.refs.breakTime2.update(BreakTimeListModule.breakTimeList[1]);
    this.refs.breakTime3.update(BreakTimeListModule.breakTimeList[2]);
    this.refs.breakTime4.update(BreakTimeListModule.breakTimeList[3]);
  }
  private change1(value: Date[] | null) {
    this.change(0, value);
  }
  private change2(value: Date[] | null) {
    this.change(1, value);
  }
  private change3(value: Date[] | null) {
    this.change(2, value);
  }
  private change4(value: Date[] | null) {
    this.change(3, value);
  }
  private change(index: number, value: Date[] | null) {
    BreakTimeListModule.updateBreakTimeAt({ index, value });
  }
}
</script>

<style scoped>
.BreakTimeContainer >>> .el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.BreakTimeContainer >>> .el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.BreakTimeContainer >>> .el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
