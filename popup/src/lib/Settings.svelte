<script lang="ts">
let show = false;
</script>

<style lang="scss">
.settings {
  gap: 1rem;
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
}

h2 {
  margin: 0;
}

.input {
  label {
    display: inline-block;
    margin-bottom: 0.25rem;
  }

  button {
    font-size: 12px;
    background: none;
    border: none;
    outline: none;
    color: white;
    font-family: "Poppins", sans-serif;
    color: #46b5f4;
    cursor: pointer;
  }

  input {
    width: calc(100% - 2rem - 4px);
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
    font-size: 14px;

    margin-bottom: 0.5rem;

    &:focus {
      border: 2px solid #46b5f4;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>

<div class="settings">
  <h2>Settings</h2>
  <div class="inputs">
    <div class="input">
      <label for="api-key">WakaTime API Key</label>
      <button on:click="{() => (show = !show)}"
        >{show ? "Hide" : "Show"}</button>
      <input
        type="{show ? 'text' : 'password'}"
        placeholder="API Key"
        id="api-key" />
    </div>

    <div class="input">
      <label for="goal">Daily Goal (minutes)</label>
      <input type="number" placeholder="Goal" id="goal" />
    </div>
  </div>
</div>
