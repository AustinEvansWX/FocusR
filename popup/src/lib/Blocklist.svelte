<script lang="ts">
interface Site {
  site: string;
  editing: boolean;
}

let blocklist: Site[] = [];

function EditSite(site: Site) {
  site.editing = false;
  blocklist = blocklist;
}

function AddSite() {
  blocklist.push({ site: "", editing: true });
  blocklist = blocklist;
}

function DeleteSite(i: number) {
  blocklist.splice(i, 1);
  blocklist = blocklist;
}

function ClearSites() {
  blocklist = [];
}
</script>

<div class="blocklist">
  <div class="header">
    <h2>Blocklist - {blocklist.length}</h2>
    <a
      target="_blank"
      rel="noreferrer"
      href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns#examples"
      >Examples</a>
  </div>

  <div class="list">
    <div class="scroll-container">
      {#if blocklist.length > 0}
        {#each blocklist as site, i}
          <div class="site">
            <input
              bind:value="{site.site}"
              type="text"
              readonly="{!site.editing}"
              placeholder="Enter site match pattern" />
            <div class="actions">
              {#if site.editing}
                <i
                  class="fa-solid fa-check submit"
                  on:keydown="{() => EditSite(site)}"
                  on:click="{() => EditSite(site)}"></i>
              {:else}
                <i
                  class="fa-solid fa-pen edit"
                  on:keydown="{() => (site.editing = true)}"
                  on:click="{() => (site.editing = true)}"></i>
              {/if}
              <i
                class="fa-solid fa-trash delete"
                on:keydown="{() => DeleteSite(i)}"
                on:click="{() => DeleteSite(i)}"></i>
            </div>
          </div>
        {/each}
      {:else}
        <p class="none">No sites on your blocklist</p>
      {/if}
    </div>
  </div>

  <div class="controls">
    <button on:click="{AddSite}">
      <i class="fa-solid fa-plus"></i>
      Add
    </button>
    <button on:click="{ClearSites}">
      <i class="fa-solid fa-trash"></i>
      Clear
    </button>
  </div>
</div>

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
  min-height: 0;

  .scroll-container {
    position: relative;
    height: 100%;
    overflow-y: scroll;
    border-radius: 5px;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .none {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgb(200, 200, 200);
    }
  }
}

.site {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background: #353b49;
  width: calc(100% - 2rem);
  border-radius: 5px;
  align-items: center;
  font-size: 16px;
  margin-bottom: 0.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }

  input {
    border: none;
    outline: none;
    border: 2px solid #292e39;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background: #292e39;
    color: white;
    font-family: "Poppins", sans-serif;
    transition: all ease 0.25s;
    font-weight: 600;
    font-size: 16px;
  }

  input:not([readonly]):focus {
    border: 2px solid #46b5f4;
  }

  input[readonly] {
    cursor: default;
  }

  .actions {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.5rem;

    i {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      transition: all ease 0.15s;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &.submit {
        background: #5cb89f;

        &:hover {
          background: #7cc6b2;
        }

        &:active {
          background: #5cb89f;
        }
      }

      &.edit {
        background: #46b5f4;

        &:hover {
          background: #6ac3f6;
        }

        &:active {
          background: #46b5f4;
        }
      }

      &.delete {
        background: #bf616a;

        &:hover {
          background: #cb8087;
        }

        &:active {
          background: #bf616a;
        }
      }
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
    transition: all ease 0.15s;
    cursor: pointer;

    &:nth-of-type(1) {
      background: #5cb89f;

      &:hover {
        background: #7cc6b2;
      }

      &:active {
        background: #5cb89f;
      }
    }

    &:nth-of-type(2) {
      background: #bf616a;

      &:hover {
        background: #cb8087;
      }

      &:active {
        background: #bf616a;
      }
    }

    i {
      margin-right: 0.25rem;
    }
  }
}
</style>
