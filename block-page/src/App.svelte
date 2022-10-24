<script lang="ts">
import { onMount } from "svelte";
import { storage } from "webextension-polyfill";

let codeTime = 0;
let dailyGoal = 0;

onMount(async () => {
  codeTime = (await storage.local.get("code-time"))["code-time"] || 0;
  dailyGoal = (await storage.local.get("daily-goal"))["daily-goal"] || 1;
});
</script>

<main>
  <h1>Keep on coding!</h1>
  <strong>
    Roughly <strong class="time">{(dailyGoal - codeTime).toFixed(0)}</strong> minutes
    to go
  </strong>
</main>

<style lang="scss">
main {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  margin: 0;
}

.time {
  color: #46b5f4;
}
</style>
