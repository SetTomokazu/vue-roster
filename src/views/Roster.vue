<template>
  <div class="roster">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Roster extends Vue {
  private targetMonth: Date = new Date();
  private workRecord: [] = [];

  private get target() {
    return this.targetMonth !== null ? this.targetMonth : new Date();
  }

  private mounted() {
    console.log(this.target);
    const d = this.target;

    const firstDate = this.getFirstDay(d);
    const lastDate = this.getLastDay(d);
    console.log(firstDate);
    console.log(lastDate);
  }

  private getFirstDay(src: Date) {
    return new Date(src.getFullYear(), src.getMonth(), 1);
  }

  private getLastDay(src: Date) {
    const nextMonth = new Date(src);
    nextMonth.setMonth(src.getMonth() + 1);
    nextMonth.setDate(0);
    return nextMonth;
  }
}
</script>
