<script lang="ts">
import { onMount } from "svelte";

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

onMount(() => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context = canvas.getContext("2d");
  Render();
});

function Render() {
  const size = Math.min(canvas.width, canvas.height) / 2.5;
  context.fillStyle = "#88c0d0";
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, size, 0, 2 * Math.PI);
  context.closePath();
  context.fill();

  context.fillStyle = "#3b4252";

  context.beginPath();
  context.moveTo(canvas.width / 2, canvas.height / 2);
  context.arc(
    canvas.width / 2,
    canvas.height / 2,
    size + 1,
    0.25 * Math.PI,
    0.75 * Math.PI
  );
  context.lineTo(canvas.width / 2, canvas.height / 2);
  context.closePath();
  context.fill();

  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, size - 15, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
}
</script>

<style lang="scss">
.status {
  gap: 1rem;
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
}

h3 {
  margin: 0;
}

.canvas {
  position: relative;

  strong {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 24px;
  }

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>

<div class="status">
  <h3>Status</h3>
  <div class="canvas">
    <strong>100% Complete</strong>
    <canvas bind:this="{canvas}"> </canvas>
  </div>
</div>
