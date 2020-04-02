<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RosterExporter from "@/components/lib/RosterExporter";

@Component({ components: {} })
export default class Home extends Vue {
  private mounted() {
    RosterExporter.export();
  }
}
</script>
