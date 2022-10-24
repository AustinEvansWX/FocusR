<script lang="ts">
import { onMount } from "svelte";

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

document.body.onresize = Resize;

onMount(() => {
  context = canvas.getContext("2d");
  Resize();
  Render();
});

function Render() {
  SetColor("transparent");
  DrawRect(0, 0, canvas.width, canvas.height);

  const midpointX = canvas.width / 2;
  const midpointY = canvas.height / 2;
  const size = Math.min(canvas.width, canvas.height) / 2.5;

  const res = 150;

  SetColor("#292e39");
  for (let i = 0; i < res; i++) {
    const percentage = i / (res - 1);
    const radian = 1.5 * Math.PI * percentage + Math.PI * 0.75;
    const x = Math.cos(radian) * size;
    const y = Math.sin(radian) * size;
    DrawCircle(midpointX + x, midpointY + y, 10, 0, 2 * Math.PI);
  }

  SetColor("#46b5f4");
  for (let i = 0; i < res; i++) {
    const percentage = i / (res - 1);
    const radian = 0.5 * Math.PI * percentage + Math.PI * 0.75;
    const x = Math.cos(radian) * size;
    const y = Math.sin(radian) * size;
    DrawCircle(midpointX + x, midpointY + y, 10, 0, 2 * Math.PI);
  }
}

function SetColor(color: string) {
  context.fillStyle = color;
}

function DrawRect(x: number, y: number, w: number, h: number) {
  context.fillRect(x, y, w, h);
}

function DrawCircle(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  context.beginPath();
  context.moveTo(x, y);
  context.arc(x, y, radius, startAngle, endAngle);
  context.lineTo(x, y);
  context.closePath();
  context.fill();
}

function Resize() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight - 6.5;
  Render();
}
</script>

<style lang="scss">
.status {
  gap: 1rem;
  display: grid;
  height: 100%;
  grid-template-rows: auto 1fr;
}

h2 {
  margin: 0;
}

.canvas {
  position: relative;
  min-height: 0px;
  box-sizing: border-box;

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
    box-sizing: border-box;
  }
}
</style>

<div class="status">
  <h2>Status</h2>
  <div class="canvas">
    <strong>34%</strong>
    <canvas bind:this="{canvas}"> </canvas>
  </div>
</div>
