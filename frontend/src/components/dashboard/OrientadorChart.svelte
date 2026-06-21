<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let dados = {};

  let canvas;

  onMount(() => {
    new Chart(canvas, {
      type: "bar",

      data: {
        labels: Object.keys(dados),

        datasets: [
          {
            label: "Quantidade",

            data: Object.values(dados)
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  });
</script>

<div class="card p-6 h-[450px]">

  <h3 class="title text-xl mb-6">
    TCCs por Orientador
  </h3>

  <canvas bind:this={canvas}></canvas>

</div>