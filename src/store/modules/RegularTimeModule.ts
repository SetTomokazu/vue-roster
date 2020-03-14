import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({ stateFactory: true })
export default class RegularTimeModule extends VuexModule {
  public range: Date[] = [
    new Date(2020, 1, 1, 9, 0, 0),
    new Date(2020, 1, 1, 18, 0, 0)
  ];

  @Mutation
  updateStartTime(start: Date) {
    this.range[0] = start;
  }
  @Mutation
  updateEndTime(end: Date) {
    this.range[1] = end;
  }
}
