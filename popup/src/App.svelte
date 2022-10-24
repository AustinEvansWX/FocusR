<script lang="ts">
import Blocklist from "./lib/Blocklist.svelte";
import Settings from "./lib/Settings.svelte";
import Status from "./lib/Status.svelte";
</script>

<style lang="scss">
main {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}

.header {
  padding: 1rem;
  background: #2e3440;

  h2 {
    margin: 0;
  }
}

.content {
  display: grid;
  padding: 1rem;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "blocklist status" "blocklist settings";

  div {
    &:nth-of-type(1) {
      grid-area: blocklist;
    }

    &:nth-of-type(2) {
      grid-area: status;
    }

    &:nth-of-type(3) {
      grid-area: settings;
    }
  }
}
</style>

<main>
  <div class="header">
    <h2>FocusR</h2>
  </div>

  <div class="content">
    <div>
      <Blocklist />
    </div>

    <div>
      <Status />
    </div>

    <div>
      <Settings />
    </div>
  </div>
</main>
