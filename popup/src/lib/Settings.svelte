<script lang="ts">
import { onMount } from "svelte";
import { storage } from "webextension-polyfill";

let wakaTimeAPIKeyInput: HTMLInputElement;
let dailyGoalInput: HTMLInputElement;

let show = false;
let notification = false;
let notificationText = "";
let fadeNotificationTimeout: NodeJS.Timeout;

function ShowNotification() {
  notification = true;
  if (fadeNotificationTimeout) clearTimeout(fadeNotificationTimeout);
  fadeNotificationTimeout = setTimeout(() => {
    fadeNotificationTimeout = null;
    notification = false;
  }, 3e3);
}

async function UpdateWakaTimeAPIKey() {
  await storage.local.set({ "wakatime-api-key": wakaTimeAPIKeyInput.value });
  notificationText = "WakaTime API Key";
  ShowNotification();
}

async function UpdateDailyGoal() {
  const dailyGoal = Math.max(1, +dailyGoalInput.value || 1);
  dailyGoalInput.value = dailyGoal.toString();
  await storage.local.set({ "daily-goal": dailyGoal });
  notificationText = "Daily Goal";
  ShowNotification();
}

onMount(async () => {
  wakaTimeAPIKeyInput.value =
    (await storage.local.get("wakatime-api-key"))["wakatime-api-key"] || "";
  dailyGoalInput.value =
    "" + ((await storage.local.get("daily-goal"))["daily-goal"] || "1");
});
</script>

<div class="settings">
  <div class="notification {notification ? 'show' : 'hide'}">
    <i class="fa-solid fa-check"></i>
    <strong>{notificationText} Updated</strong>
  </div>

  <h2>Settings</h2>
  <div class="inputs">
    <div class="input">
      <label for="api-key">WakaTime API Key</label>
      <button on:click="{() => (show = !show)}"
        >{show ? "Hide" : "Show"}</button>
      <input
        bind:this="{wakaTimeAPIKeyInput}"
        type="{show ? 'text' : 'password'}"
        placeholder="API Key"
        id="api-key"
        on:change="{UpdateWakaTimeAPIKey}" />
    </div>

    <div class="input">
      <label for="goal">Daily Goal (minutes)</label>
      <input
        bind:this="{dailyGoalInput}"
        type="number"
        placeholder="Goal"
        id="goal"
        on:change="{UpdateDailyGoal}" />
    </div>
  </div>
</div>

<style lang="scss">
.notification {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #353b49;
  height: 48px;
  border-radius: 5px;
  display: grid;
  align-items: center;
  padding: 0 1rem;
  font-size: 14px;
  border-left: 5px solid #5cb89f;
  grid-template-columns: auto auto;
  gap: 0.25rem;
  transition: all ease 0.25s;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }
}

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
