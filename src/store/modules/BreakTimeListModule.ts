import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

export interface IBreakTimeList {
  breakTimeList: (Date[] | null)[];
}

@Module({ dynamic: true, store, name: "regularTime" })
class BreakTimeList extends VuexModule implements IBreakTimeList {
  public breakTimeList: (Date[] | null)[] = [null, null, null, null];

  @Mutation
  updateBreakTimeAt(arg: { index: number; value: Date[] | null }) {
    console.log(`updateBreakTimeAt ${arg.index}: ${arg.value}`);
    this.breakTimeList[arg.index] = arg.value;
  }
}

export const BreakTimeListModule = getModule(BreakTimeList);
