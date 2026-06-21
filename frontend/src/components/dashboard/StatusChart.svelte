<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let dados = {};

  let canvas;

  onMount(() => {
    new Chart(canvas, {
      type: "doughnut",

      data: {
        labels: Object.keys(dados),

        datasets: [
          {
            data: Object.values(dados)
          }
        ]
      },

      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
  });
</script>

<div class="card p-6">
  <h3 class="title text-xl mb-6">
    TCCs por Status
  </h3>

  <canvas bind:this={canvas}></canvas>
</div>