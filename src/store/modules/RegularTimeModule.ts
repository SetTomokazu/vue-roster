import {
  Module,
  VuexModule,
  Mutation,
  getModule
} from "vuex-module-decorators";
import store from "@/store";

export interface IRegularTime {
  range: Date[];
}

@Module({ dynamic: true, store, name: "regularTime" })
class RegularTime extends VuexModule implements IRegularTime {
  public range: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];

  public get Range() {
    return this.range;
  }

  @Mutation
  update(range: Date[]) {
    this.range = range;
  }
}

export const RegularTimeModule = getModule(RegularTime);
