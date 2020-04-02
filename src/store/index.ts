import Vue from "vue";
import Vuex from "vuex";
import { IRegularTime } from "./modules/RegularTimeModule";
import { IRosterRecordList } from "./modules/RosterRecordListModule";
import { IBreakTimeList } from "./modules/BreakTimeListModule";

Vue.use(Vuex);

export interface IRootState {
  breakTimeList: IBreakTimeList;
  regularTime: IRegularTime;
  rosterRecordList: IRosterRecordList;
}

export default new Vuex.Store<IRootState>({});
