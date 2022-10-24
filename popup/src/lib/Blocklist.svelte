<script lang="ts">
let blocklist = ["https://youtube.com/*"];
</script>

<style lang="scss">
.blocklist {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    display: inline;
    margin: 0;
  }
}

.list {
  background: #2e3440;
  padding: 0.5rem;
  border-radius: 5px;
}

.site {
  padding: 1rem;
  background: #3b4252;
  width: calc(100% - 2rem);
  border-radius: 5px;
}

.controls {
  display: flex;
  justify-content: space-between;

  button {
    padding: 0.5rem 2rem;
    border: none;
    border-radius: 5px;
    color: white;
    font-family: "Poppins", sans-serif;

    &:nth-of-type(1) {
      background: #a3be8c;
    }

    &:nth-of-type(2) {
      background: #bf616a;
    }
  }
}
</style>

<div class="blocklist">
  <div class="header">
    <h3>Block List</h3>
    <a
      href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#examples"
      >Examples</a>
  </div>

  <div class="list">
    {#each blocklist as site}
      <div class="site">{site}</div>
    {/each}
  </div>

  <div class="controls">
    <button>Add</button>
    <button>Clear</button>
  </div>
</div>
