import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import RosterRecord from "@/components/lib/RosterRecord";
import DateUtils from "@/components/lib/DateUtils";

export interface IRosterRecordList {
  list: RosterRecord[];
}

@Module({ dynamic: true, store, name: "regularTime" })
class RosterRecordList extends VuexModule implements IRosterRecordList {
  public list: RosterRecord[] = [];

  @Mutation
  init(targetMonth: Date) {
    this.list = DateUtils.getDaysOfMonth(targetMonth).map(
      t => new RosterRecord(t)
    );
  }

  @Mutation
  updateStartAt(arg: { index: number; value: Date | null }) {
    console.log(`updateStartAt ${arg.index}: ${arg.value}`);
    this.list[arg.index].start = arg.value;
  }

  @Mutation
  updateEndAt(arg: { index: number; value: Date | null }) {
    console.log(`updateEndAt ${arg.index}: ${arg.value}`);
    this.list[arg.index].end = arg.value;
  }
}

export const RosterRecordListModule = getModule(RosterRecordList);
