import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);
import { initialiseStores } from "@/utils/store-accessor";
import Roster from "./modules/Roster";
import RegularTimeModule from "./modules/RegularTimeModule";
const initializer = (store: Store<any>) => initialiseStores(store);
export const plugins = [initializer];
export * from "@/utils/store-accessor";

export default new Vuex.Store({
  state: {},
  modules: {
    Roster,
    RegularTimeModule
  }
});
