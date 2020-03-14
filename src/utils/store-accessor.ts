import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import RegularTimeModule from "@/store/modules/RegularTimeModule";

let RegularTimeStore: RegularTimeModule;

function initialiseStores(store: Store<any>): void {
  RegularTimeStore = getModule(RegularTimeModule, store);
}

export { initialiseStores, RegularTimeStore };
