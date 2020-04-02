import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import DateUtils from "@/components/lib/DateUtils";
import moment from "moment";

export interface IBreakTimeList {
  breakTimeList: (Date[] | null)[];
}

@Module({ dynamic: true, store, name: "breakTimeList" })
class BreakTimeList extends VuexModule implements IBreakTimeList {
  public breakTimeList: (Date[] | null)[] = [
    [new Date(2020, 1, 1, 8, 30, 0), new Date(2020, 1, 1, 9, 0, 0)],
    [new Date(2020, 1, 1, 12, 0, 0), new Date(2020, 1, 1, 13, 0, 0)],
    [new Date(2020, 1, 1, 18, 0, 0), new Date(2020, 1, 1, 18, 30, 0)],
    [new Date(2020, 1, 1, 21, 30, 0), new Date(2020, 1, 1, 22, 0, 0)]
  ];

  public get shadowList(): Date[][] {
    return this.breakTimeList
      .filter(b => b !== null)
      .map(b => [moment(b![0]).toDate(), moment(b![1]).toDate()]);
  }

  @Mutation
  updateBreakTimeAt(arg: { index: number; value: Date[] | null }): void {
    console.log(`updateBreakTimeAt ${arg.index}: ${arg.value}`);
    this.breakTimeList[arg.index] =
      arg.value === null ? null : DateUtils.removeUnderSecondOfRange(arg.value);
  }
}

export const BreakTimeListModule: BreakTimeList = getModule(BreakTimeList);
