<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let dados = {};
  let canvas;
  let chartInstance;

  onMount(() => {
    chartInstance = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(dados),
        datasets: [
          {
            data: Object.values(dados),
            backgroundColor: ['#eab308', '#3b82f6', '#22c55e', '#ef4444']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom"
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
  <h3 class="text-xl font-bold text-slate-900 mb-4">TCCs por Status</h3>
  <div class="flex-1 relative">
    <canvas bind:this={canvas}></canvas>
  </div>
</div>