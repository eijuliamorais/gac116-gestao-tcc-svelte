<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let dados = {};
  let canvas;
  let chartInstance;

  onMount(() => {
    chartInstance = new Chart(canvas, {
      type: "bar",
      data: {
        labels: Object.keys(dados),
        datasets: [
          {
            label: "Quantidade de Trabalhos",
            data: Object.values(dados),
            backgroundColor: "#3b82f6",
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  });
</script>

<div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-[400px] flex flex-col">
  <h3 class="text-xl font-bold text-slate-900 mb-4">TCCs por Orientador</h3>
  <div class="flex-1 relative">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>