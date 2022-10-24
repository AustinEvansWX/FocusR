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

  h2 {
    display: inline;
    margin: 0;
  }

  a {
    color: #46b5f4;
  }
}

.list {
  background: #292e39;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: inset 0 0 15px -10px black;
}

.site {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #353b49;
  width: calc(100% - 2rem);
  border-radius: 5px;
  align-items: center;
  font-size: 16px;

  p {
    margin: 0;
  }

  i {
    position: relative;
    background: #bf616a;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
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
    font-weight: 600;
    font-size: 14px;

    &:nth-of-type(1) {
      background: #5cb89f;
    }

    &:nth-of-type(2) {
      background: #bf616a;
    }

    i {
      margin-right: 0.25rem;
    }
  }
}
</style>

<div class="blocklist">
  <div class="header">
    <h2>Block List</h2>
    <a
      target="_blank"
      rel="noreferrer"
      href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#examples"
      >Examples</a>
  </div>

  <div class="list">
    {#each blocklist as site}
      <div class="site">
        <p>{site}</p>
        <i class="fa-solid fa-trash"></i>
      </div>
    {/each}
  </div>

  <div class="controls">
    <button>
      <i class="fa-solid fa-plus"></i> Add
    </button>
    <button>
      <i class="fa-solid fa-trash"></i> Clear
    </button>
  </div>
</div>
