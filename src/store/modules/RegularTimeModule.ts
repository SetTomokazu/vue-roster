import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import DateUtils from "@/components/lib/DateUtils";

export interface IRegularTime {
  range: Date[] | null;
}

@Module({ dynamic: true, store, name: "regularTime" })
class RegularTime extends VuexModule implements IRegularTime {
  public range: Date[] | null = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];

  @Mutation
  update(range: Date[] | null) {
    this.range =
      range === null ? null : DateUtils.removeUnderSecondOfRange(range);
  }
}

export const RegularTimeModule = getModule(RegularTime);
