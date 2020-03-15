import Vue from "vue";
import Vuex, { Store } from "vuex";
import { IRegularTime } from "./modules/RegularTimeModule";
import { IRosterRecordList } from "./modules/RosterRecordListModule";

Vue.use(Vuex);

export interface IRootState {
  regularTime: IRegularTime;
  rosterRecordList: IRosterRecordList;
}

export default new Vuex.Store<IRootState>({});
