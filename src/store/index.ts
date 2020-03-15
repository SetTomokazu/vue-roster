import Vue from "vue";
import Vuex, { Store } from "vuex";
import { IRegularTime } from "./modules/RegularTimeModule";

Vue.use(Vuex);

export interface IRootState {
  regularTime: IRegularTime;
}

export default new Vuex.Store<IRootState>({});
