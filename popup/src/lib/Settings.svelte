<style lang="scss">
.settings {
  gap: 1rem;
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
}

h3 {
  margin: 0;
}

.input {
  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  input {
    width: calc(100% - 2rem);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background: #2e3440;
    color: white;
    font-family: "Poppins", sans-serif;

    margin-bottom: 0.5rem;

    &:last-of-type() {
      margin-bottom: 0;
    }
  }
}
</style>

<div class="settings">
  <h3>Settings</h3>
  <div class="inputs">
    <div class="input">
      <label for="api-key">WakaTime API Key</label>
      <input type="text" placeholder="API Key" id="api-key" />
    </div>

    <div class="input">
      <label for="goal">Daily Goal (minutes)</label>
      <input type="number" placeholder="Goal" id="goal" />
    </div>
  </div>
</div>
