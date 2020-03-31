import "jest";
import { shallowMount } from "@vue/test-utils";
import BreakTime from "@/components/parts/BreakTime.vue";

describe("HelloWorld.vue", () => {
  test("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(BreakTime, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
